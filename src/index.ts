import TinkerMail from './TinkerMail';

/**
 * This is the entry point for the tinkermail Node.js SDK.
 *
 * @param apiKey The API key of the tinkermail account you wish to use the SDK with.
 */
export default function init(apiKey: string): TinkerMail {
    return new TinkerMail(apiKey);
}
