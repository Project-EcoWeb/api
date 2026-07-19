import assert from 'node:assert/strict';
import test from 'node:test';
import UserService from '../../../src/application/services/UserService.js';
import UserRepository from '../../../src/domain/repositories/UserRespository.js';
import ProjectRepository from '../../../src/domain/repositories/ProjectRepository.js';
import UserValidator from '../../../src/application/validations/UserValidator.js';

test('UserService.update valida usuário e corpo antes de atualizar', async (t) => {
    t.mock.method(UserValidator, 'isExists', async () => false);

    await assert.rejects(
        UserService.update({ id: 'user-1', user: { name: 'Ana' } }),
        (error) => error.statusCode === 404 && error.message === 'user not found'
    );
});

test('UserService.update rejeita corpo vazio', async (t) => {
    t.mock.method(UserValidator, 'isExists', async () => true);

    await assert.rejects(
        UserService.update({ id: 'user-1' }),
        (error) => error.statusCode === 400 && error.message === 'body is invalid'
    );
});

test('UserService.findById monta o perfil com projetos', async (t) => {
    t.mock.method(UserValidator, 'isExists', async () => true);
    t.mock.method(UserRepository, 'findById', async () => ({ id: 'user-1', name: 'Ana', email: 'ana@example.com' }));
    t.mock.method(ProjectRepository, 'findByUser', async () => [{ id: 'project-1' }]);

    assert.deepEqual(await UserService.findById('user-1'), {
        user: { id: 'user-1', name: 'Ana', email: 'ana@example.com', numberProjects: 1, projects: [{ id: 'project-1' }] }
    });
});
