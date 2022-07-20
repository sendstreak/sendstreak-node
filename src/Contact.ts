export type AttribType = Date | boolean | number | string | null;

export default interface Contact extends Record<string, AttribType> {
    email: string;
}
