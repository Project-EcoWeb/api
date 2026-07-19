import assert from 'node:assert/strict';
import test from 'node:test';
import SearchService from '../../../src/application/services/SearchService.js';
import MaterialRepository from '../../../src/domain/repositories/MaterialRepository.js';
import ProjectRepository from '../../../src/domain/repositories/ProjectRepository.js';

test('SearchService retorna mensagem quando não recebe texto', async () => {
    assert.deepEqual(await SearchService.getByText(), { message: 'result not foun with this text' });
});

test('SearchService reúne resultados e metadados de projetos e materiais', async (t) => {
    t.mock.method(ProjectRepository, 'findAllByContainsText', async () => [{ id: 'project-1' }]);
    t.mock.method(MaterialRepository, 'findAllByContainsText', async () => [{ id: 'material-1' }, { id: 'material-2' }]);

    assert.deepEqual(await SearchService.getByText('papel'), {
        query: 'papel',
        results: {
            projects: [{ id: 'project-1' }],
            materials: [{ id: 'material-1' }, { id: 'material-2' }]
        },
        meta: { numberProjects: 1, numberMaterials: 2, total: 3 }
    });
});
