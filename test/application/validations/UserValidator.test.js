import assert from 'node:assert/strict';
import test from 'node:test';
import UserValidator from '../../../src/application/validations/UserValidator.js';
import UserRepository from '../../../src/domain/repositories/UserRespository.js';

test('UserValidator.isExists identifica usuário encontrado por id', async (t) => {
    t.mock.method(UserRepository, 'findById', async () => ({ id: 'user-1' }));

    assert.equal(await UserValidator.isExists('user-1'), true);
});

test('UserValidator.isExistsByEmail identifica e-mail ausente', async (t) => {
    t.mock.method(UserRepository, 'findByEmail', async () => null);

    assert.equal(await UserValidator.isExistsByEmail('ana@example.com'), false);
});
