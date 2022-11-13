import type Contact from './Contact';
import type { AttribType } from './Contact';
import invokeAPI from './invokeAPI';

export default class SendStreak {
    private readonly variables: Record<string, number | string> & { server: string } = {
        server: 'https://api.sendstreak.com'
    };

    public constructor(private readonly apiKey: string) {
        if (!apiKey) {
            throw new Error('An API key is required to initialize the SendStreak SDK');
        }
    }

    /**
     * Deletes a contact from your audience with all the attributes it may have.
     *
     * @param email The email of the contact to delete.
     */
    public async deleteContact(email: string): Promise<void> {
        await invokeAPI(this.apiKey, this.variables.server, `/v1/contacts/${email}`, undefined, 'DELETE');
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
        await invokeAPI(this.apiKey, this.variables.server, '/v1/messages', {
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
            throw new Error('SendStreak contacts must have an \'email\' field with a valid email address.');
        }

        await invokeAPI(this.apiKey, this.variables.server, '/v1/contacts', contact);
    }
}
