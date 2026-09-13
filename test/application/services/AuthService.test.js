import assert from 'node:assert/strict';
import test from 'node:test';
import jwt from 'jsonwebtoken';
import AuthService from '../../../src/application/services/AuthService.js';
import UserRepository from '../../../src/domain/repositories/UserRespository.js';
import UserValidator from '../../../src/application/validations/UserValidator.js';
import authConfig from '../../../src/shared/config/auth.js';

test('AuthService.register persiste um novo usuário', async (t) => {
    const user = { name: 'Ana', email: 'ana@example.com', password: 'secret' };
    let savedUser;

    t.mock.method(UserValidator, 'isExistsByEmail', async () => false);
    t.mock.method(UserRepository, 'save', async (data) => { savedUser = data; });

    await AuthService.register(user);

    assert.deepEqual(savedUser, user);
});

test('AuthService.register rejeita campos obrigatórios ausentes', async () => {
    await assert.rejects(
        AuthService.register({ name: 'Ana', email: 'ana@example.com' }),
        (error) => error.statusCode === 400 && error.message === 'fields incompleted'
    );
});

test('AuthService.register rejeita e-mail já cadastrado', async (t) => {
    t.mock.method(UserValidator, 'isExistsByEmail', async () => true);
    const save = t.mock.method(UserRepository, 'save', async () => {});

    await assert.rejects(
        AuthService.register({ name: 'Ana', email: 'ana@example.com', password: 'secret' }),
        (error) => error.statusCode === 409 && error.message === 'user with this email already registered'
    );

    assert.equal(save.mock.calls.length, 0);
});

test('AuthService.login retorna usuário público e token válido', async (t) => {
    t.mock.method(UserValidator, 'isExistsByEmail', async () => true);
    t.mock.method(UserRepository, 'findByEmailAndComparePassword', async () => ({
        id: 'user-1',
        name: 'Ana',
        email: 'ana@example.com'
    }));

    const result = await AuthService.login({ email: 'ana@example.com', password: 'secret' });

    assert.deepEqual(result.user, { id: 'user-1', name: 'Ana', email: 'ana@example.com' });
    assert.equal(jwt.verify(result.token, authConfig.secret).id, 'user-1');
});

test('AuthService.login rejeita senha inválida', async (t) => {
    t.mock.method(UserValidator, 'isExistsByEmail', async () => true);
    t.mock.method(UserRepository, 'findByEmailAndComparePassword', async () => null);

    await assert.rejects(
        AuthService.login({ email: 'ana@example.com', password: 'wrong' }),
        (error) => error.statusCode === 401 && error.message === 'password incorrect'
    );
});
