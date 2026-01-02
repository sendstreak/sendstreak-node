/* eslint-disable @typescript-eslint/naming-convention */
import http from 'http';
import https from 'https';

import SendStreakError from './SendStreakError';

const RESPONSE_UNAUTH = 401;

export default function invokeAPI(
    apiKey: string,
    server: string,
    path: string,
    body?: Record<string, unknown>,
    method?: string
): Promise<{ body: string; statusCode: number }> {
    return new Promise((resolve, reject) => {
        try {
            const url = new URL(`${server}${path}`);
            let client;

            switch (url.protocol) {
                case 'http:':
                    client = http;
                    break;
                default:
                    client = https;
            }

            const headers: Record<string, number | string> = {
                Authorization: `Bearer ${apiKey}`
            };

            let postData;

            if (body !== undefined) {
                postData = JSON.stringify(body);
                headers[ 'Content-Length' ] = Buffer.byteLength(postData);
                headers[ 'Content-Type' ] = 'application/json';
            }

            const request = client.request(url, {
                headers,
                method: method ?? 'POST'
            }, response => {
                response.setEncoding('utf8');

                const responseBody: string[] = [];
                const { statusCode } = response;

                if (statusCode === RESPONSE_UNAUTH) {
                    console.warn('Invalid API key provided');
                }

                response.on('data', (data: string) => {
                    responseBody.push(data);
                });

                response.on('end', () => {
                    if (statusCode !== undefined && statusCode >= 200 && statusCode < 300) {
                        resolve({
                            body: responseBody.join(''),
                            statusCode
                        });
                    } else {
                        reject(new SendStreakError(statusCode, responseBody.join('')));
                    }
                });
            });

            request.on('error', error => {
                reject(error);
            });


            if (postData !== undefined) {
                request.write(postData);
            }

            request.end();
        } catch (error) {
            reject(error);
        }
    });
}
