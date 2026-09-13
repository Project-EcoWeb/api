import assert from 'node:assert/strict';
import test from 'node:test';
import HomeController from '../../../src/http/controllers/HomeController.js';
import MaterialController from '../../../src/http/controllers/MaterialController.js';
import ProjectController from '../../../src/http/controllers/ProjectController.js';
import MaterialService from '../../../src/application/services/MaterialService.js';
import ProjectService from '../../../src/application/services/ProjectService.js';
import FavoriteService from '../../../src/application/services/FavoriteService.js';
import logger from '../../../src/infra/logger/logger.js';
import { response } from '../../helpers/http.js';

test('HomeController reúne os últimos projetos e materiais', async (t) => {
    t.mock.method(ProjectService, 'findThreeLast', async () => [{ id: 'project-1' }]);
    t.mock.method(MaterialService, 'findLastThree', async () => [{ id: 'material-1' }]);
    const res = response();

    await HomeController.home({}, res);

    assert.deepEqual(res.body, { projects: [{ id: 'project-1' }], materials: [{ id: 'material-1' }] });
});

test('HomeController preserva mensagem de erro do service', async (t) => {
    t.mock.method(ProjectService, 'findThreeLast', async () => { throw Object.assign(new Error('unavailable'), { statusCode: 503 }); });
    t.mock.method(logger, 'info', () => {});
    const res = response();

    await HomeController.home({}, res);

    assert.equal(res.statusCode, 503);
    assert.deepEqual(res.body, { message: 'unavailable' });
});

test('MaterialController.updateStatus encaminha status, id e usuário', async (t) => {
    let received;
    t.mock.method(MaterialService, 'updateStatus', async (data) => { received = data; });
    const res = response();

    await MaterialController.updateStatus({ body: { status: 'pausado' }, params: { id: 'material-1' }, userId: 'company-1' }, res);

    assert.deepEqual(received, { status: 'pausado', id: 'material-1', user: 'company-1' });
    assert.equal(res.ended, true);
});

test('MaterialController.delete retorna 200 após remover material', async (t) => {
    t.mock.method(MaterialService, 'delete', async () => {});
    const res = response();

    await MaterialController.delete({ params: { id: 'material-1' }, userId: 'company-1' }, res);

    assert.equal(res.statusCode, 200);
    assert.equal(res.ended, true);
});

test('ProjectController.countProjectsByUser retorna contador e usuário', async (t) => {
    t.mock.method(ProjectService, 'countProjectsByUser', async () => 2);
    const res = response();

    await ProjectController.countProjectsByUser({ userId: 'user-1' }, res);

    assert.deepEqual(res.body, { data: { user: 'user-1', numberProjects: 2 } });
});

test('ProjectController.findByUser preserva statusCode do service', async (t) => {
    t.mock.method(ProjectService, 'findByUser', async () => { throw Object.assign(new Error('User not exists'), { statusCode: 409 }); });
    t.mock.method(logger, 'info', () => {});
    const res = response();

    await ProjectController.findByUser({ userId: 'user-1' }, res);

    assert.equal(res.statusCode, 409);
    assert.deepEqual(res.body, { message: 'User not exists' });
});

test('ProjectController.countFavoritesByUser usa o service de favoritos', async (t) => {
    t.mock.method(FavoriteService, 'countFavoritesByUser', async () => 3);
    const res = response();

    await ProjectController.countFavoritesByUser({ userId: 'user-1' }, res);

    assert.deepEqual(res.body, { data: { user: 'user-1', numberFavorites: 3 } });
});
