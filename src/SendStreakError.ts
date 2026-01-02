export default class SendStreakError extends Error {
    public readonly status: number | undefined;

    public constructor(status: number | undefined, message: string) {
        super(message);

        this.status = status;
    }
}
