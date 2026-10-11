import assert from 'node:assert/strict';
import test from 'node:test';
import checkFields from '../../../src/http/middlewares/checkFields.js';

function response() {
    return {
        body: undefined,
        statusCode: undefined,
        status(statusCode) {
            this.statusCode = statusCode;
            return this;
        },
        json(body) {
            this.body = body;
            return this;
        }
    };
}

test('checkFields rejeita login sem senha e não continua a requisição', async () => {
    const res = response();
    let nextCalled = false;

    await checkFields(
        { query: {}, body: { email: 'user@example.com' } },
        res,
        () => { nextCalled = true; }
    );

    assert.equal(res.statusCode, 400);
    assert.deepEqual(res.body, { message: 'missing password field' });
    assert.equal(nextCalled, false);
});

test('checkFields aceita credenciais de usuário completas', async () => {
    const res = response();
    let nextCalled = false;

    await checkFields(
        { query: {}, body: { email: 'user@example.com', password: 'secret' } },
        res,
        () => { nextCalled = true; }
    );

    assert.equal(res.statusCode, undefined);
    assert.equal(nextCalled, true);
});

test('checkFields exige emailOrCnpj no login de empresa', async () => {
    const res = response();
    let nextCalled = false;

    await checkFields(
        { query: { q: 'company' }, body: { password: 'secret' } },
        res,
        () => { nextCalled = true; }
    );

    assert.equal(res.statusCode, 400);
    assert.deepEqual(res.body, { message: 'missing emailOrCnpj field' });
    assert.equal(nextCalled, false);
});
