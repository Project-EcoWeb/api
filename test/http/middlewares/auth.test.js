import assert from 'node:assert/strict';
import test from 'node:test';
import jwt from 'jsonwebtoken';
import authentication from '../../../src/http/middlewares/auth.js';
import authConfig from '../../../src/shared/config/auth.js';

function response() {
    return {
        body: undefined,
        statusCode: undefined,
        status(statusCode) { this.statusCode = statusCode; return this; },
        json(body) { this.body = body; return this; }
    };
}

test('auth rejeita requisição sem token', async () => {
    const res = response();
    let nextCalled = false;

    await authentication({ headers: {} }, res, () => { nextCalled = true; });

    assert.equal(res.statusCode, 401);
    assert.deepEqual(res.body, { error: 'token not exists' });
    assert.equal(nextCalled, false);
});

test('auth associa o usuário da assinatura JWT à requisição', async () => {
    const token = jwt.sign({ id: 'user-1' }, authConfig.secret);
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = response();
    let nextCalled = false;

    await authentication(req, res, () => { nextCalled = true; });

    assert.equal(req.userId, 'user-1');
    assert.equal(nextCalled, true);
    assert.equal(res.statusCode, undefined);
});
