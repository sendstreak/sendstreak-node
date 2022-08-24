import http from 'http';
import https from 'https';

const RESPONSE_UNAUTH = 401;

export default function invokeAPI(
    apiKey: string,
    server: string,
    path: string,
    body: Record<string, unknown>
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

            const postData = JSON.stringify(body);

            const request = client.request(url, {
                headers: {
                    /* eslint-disable @typescript-eslint/naming-convention */
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Length': Buffer.byteLength(postData),
                    'Content-Type': 'application/json'
                    /* eslint-enable @typescript-eslint/naming-convention */
                },
                method: 'POST'
            }, response => {
                response.setEncoding('utf8');

                const responseBody = Buffer.from('');
                const { statusCode } = response;

                if (statusCode === RESPONSE_UNAUTH) {
                    console.warn('Invalid API key provided');
                }

                response.on('data', (data: string) => {
                    responseBody.write(data);
                });

                response.on('end', () => {
                    resolve({
                        body: responseBody.toString('utf8'),
                        statusCode: statusCode!
                    });
                });
            });

            request.on('error', error => {
                reject(error);
            });

            request.write(postData);
            request.end();
        } catch (error) {
            console.error(`Error invoking the tinkermail API. Error message: ${(error as Error).message}`);
        }
    });
}
