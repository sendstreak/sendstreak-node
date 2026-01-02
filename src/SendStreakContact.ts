export type AttribType = Date | boolean | number | string | null;

export default interface SendStreakContact extends Record<string, AttribType> {
    email: string;
}
