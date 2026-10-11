import assert from 'node:assert/strict';
import test from 'node:test';
import ProjectService from '../../../src/application/services/ProjectService.js';
import ProjectRepository from '../../../src/domain/repositories/ProjectRepository.js';
import UserValidator from '../../../src/application/validations/UserValidator.js';

test('ProjectService.findByUser rejeita usuário inexistente', async (t) => {
    t.mock.method(UserValidator, 'isExists', async () => false);

    await assert.rejects(
        ProjectService.findByUser('user-1'),
        (error) => error.statusCode === 409 && error.message === 'User not exists'
    );
});

test('ProjectService.save associa o projeto ao usuário autenticado', async (t) => {
    const input = { title: 'Vaso', image: 'image.jpg', description: 'Reuso', materials: ['garrafa'], stages: ['cortar'], category: 'decoração', difficulty: 'Facil' };
    let saved;
    t.mock.method(ProjectRepository, 'save', async (data) => { saved = data; return { id: 'project-1' }; });

    const result = await ProjectService.save(input, 'user-1');

    assert.deepEqual(result, { id: 'project-1' });
    assert.deepEqual(saved, { ...input, user: 'user-1', date: undefined, video: undefined });
});

test('ProjectService.getById rejeita projeto não encontrado', async (t) => {
    t.mock.method(ProjectRepository, 'findById', async () => null);

    await assert.rejects(
        ProjectService.getById({ id: 'project-1' }),
        (error) => error.statusCode === 404 && error.message === 'project not found'
    );
});
