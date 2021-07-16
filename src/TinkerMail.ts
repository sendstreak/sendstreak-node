import Contact from 'Contact';
import fetch from 'node-fetch';

const RESPONSE_UNAUTH = 401;

export default class TinkerMailSdk {
    private readonly variables: Record<string, string | number> = {
        server: 'https://api.tinkermail.io'
    };

    public constructor(private readonly apiKey: string) {
        if (!apiKey) {
            throw new Error('An API key is required to initialize the tinkermail SDK');
        }
    }

    /**
     * Sends a single mail using the provided template.
     *
     * @param rcptAddress The email address of the recipient.
     * @param templateSlug The slug string of the template to use.
     * @param variables Any additional variables needed to fill the template.
     */
    public sendMail(
        rcptAddress: string,
        templateSlug: string,
        variables: Record<string, string>
    ): Promise<void> {
        return this.invokeTinkermailAPI('/v1/messages', {
            rcpt: rcptAddress,
            templateSlug,
            variables
        });
    }

    /**
     * Function to update driver variables. For advanced use only!
     *
     * @param name The name of the variable to update.
     * @param value The new value for the variable.
     */
    public set(name: string, value: string | number): void {
        this.variables[ name ] = value;
    }

    /**
     * Updates a (or creates a new) contact. The object must have an email field with a valid email
     * address provided, and optionally any string, number, boolean, or date fields that will be stored
     * as attributes.
     *
     * @param contact The partial contact object to update (or create) the contact with.
     */
    public updateContact(contact: Contact): Promise<void> {
        const { email } = contact;

        if (!email || !(/.+@.+\..+/u).exec(email)) {
            throw new Error('Tinkermail contacts must have an \'email\' field with a valid email address.');
        }

        return this.invokeTinkermailAPI('/v1/contacts', contact);
    }

    private async invokeTinkermailAPI(path: string, body: Record<string, unknown>): Promise<void> {
        try {
            const response = await fetch(`${this.variables.server}${path}`, {
                body: JSON.stringify(body),
                headers: {
                    /* eslint-disable @typescript-eslint/naming-convention */
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                    /* eslint-enable @typescript-eslint/naming-convention */
                },
                method: 'POST'
            });

            switch (response.status) {
                case RESPONSE_UNAUTH:
                    throw new Error('Invalid API key provided');
                default:
                    // Nothing to do here
            }
        } catch (error) {
            console.error(`Error invoking the tinkermail API. Error message: ${(error as Error).message}`);
        }
    }
}
