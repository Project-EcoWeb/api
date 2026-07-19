export function response() {
    return {
        body: undefined,
        ended: false,
        statusCode: undefined,
        status(statusCode) { this.statusCode = statusCode; return this; },
        json(body) { this.body = body; return this; },
        end() { this.ended = true; return this; }
    };
}
