import assert from 'node:assert/strict';
import test from 'node:test';
import AuthController from '../../../src/http/controllers/AuthController.js';
import AuthService from '../../../src/application/services/AuthService.js';
import { response } from '../../helpers/http.js';

test('AuthController.login retorna os dados produzidos pelo service', async (t) => {
    const data = { user: { id: 'user-1' }, token: 'token' };
    let received;
    t.mock.method(AuthService, 'login', async (input) => { received = input; return data; });
    const res = response();

    await AuthController.login({ query: {}, body: { email: 'ana@example.com', password: 'secret' } }, res);

    assert.deepEqual(received, { email: 'ana@example.com', password: 'secret' });
    assert.deepEqual(res.body, data);
});

test('AuthController.register retorna 201 após cadastrar empresa', async (t) => {
    let received;
    t.mock.method(AuthService, 'registerCompany', async (input) => { received = input; });
    const res = response();
    const body = { name: 'Eco Ltda' };

    await AuthController.register({ query: { q: 'company' }, body }, res);

    assert.deepEqual(received, body);
    assert.equal(res.statusCode, 201);
    assert.equal(res.ended, true);
});

test('AuthController transforma AppError em resposta HTTP', async (t) => {
    t.mock.method(AuthService, 'login', async () => { throw Object.assign(new Error('password incorrect'), { statusCode: 401 }); });
    const res = response();

    await AuthController.login({ query: {}, body: {} }, res);

    assert.equal(res.statusCode, 401);
    assert.deepEqual(res.body, { message: 'password incorrect' });
});
