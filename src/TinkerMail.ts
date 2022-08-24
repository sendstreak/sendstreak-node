import type Contact from './Contact';
import type { AttribType } from './Contact';
import invokeAPI from './invokeAPI';

export default class TinkerMail {
    private readonly variables: Record<string, number | string> = {
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
    public async sendMail(
        rcptAddress: string,
        templateSlug: string,
        variables: Record<string, AttribType>
    ): Promise<void> {
        await invokeAPI(this.apiKey, this.variables.server as string, '/v1/messages', {
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
    public set(name: string, value: number | string): void {
        this.variables[ name ] = value;
    }

    /**
     * Updates a (or creates a new) contact. The object must have an email field with a valid email
     * address provided, and optionally any string, number, boolean, or date fields that will be stored
     * as attributes.
     *
     * @param contact The partial contact object to update (or create) the contact with.
     */
    public async updateContact(contact: Contact): Promise<void> {
        const { email } = contact;

        if (!email || !(/.+@.+\..+/u).exec(email)) {
            throw new Error('Tinkermail contacts must have an \'email\' field with a valid email address.');
        }

        await invokeAPI(this.apiKey, this.variables.server as string, '/v1/contacts', contact);
    }
}
