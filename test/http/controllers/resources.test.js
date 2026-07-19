import assert from 'node:assert/strict';
import test from 'node:test';
import CompanyController from '../../../src/http/controllers/CompanyController.js';
import FavoriteController from '../../../src/http/controllers/FavoriteController.js';
import FeedbackController from '../../../src/http/controllers/FeedbackController.js';
import SearchController from '../../../src/http/controllers/SearchController.js';
import UserController from '../../../src/http/controllers/UserController.js';
import CompanyService from '../../../src/application/services/CompanyService.js';
import FavoriteService from '../../../src/application/services/FavoriteService.js';
import FeedbackService from '../../../src/application/services/FeedbackService.js';
import SearchService from '../../../src/application/services/SearchService.js';
import UserService from '../../../src/application/services/UserService.js';
import { response } from '../../helpers/http.js';

test('CompanyController.getMeProfile usa o usuário autenticado', async (t) => {
    t.mock.method(CompanyService, 'getProfileById', async (id) => ({ id }));
    const res = response();
    await CompanyController.getMeProfile({ userId: 'company-1' }, res);
    assert.deepEqual(res.body, { id: 'company-1' });
});

test('FavoriteController.save associa o favorito ao usuário autenticado', async (t) => {
    let received;
    t.mock.method(FavoriteService, 'save', async (data) => { received = data; });
    const res = response();
    await FavoriteController.save({ userId: 'user-1', body: { reference: 'project-1' } }, res);
    assert.deepEqual(received, { user: 'user-1', reference: 'project-1' });
    assert.equal(res.ended, true);
});

test('FeedbackController responde 201 ao salvar feedback', async (t) => {
    t.mock.method(FeedbackService, 'save', async () => {});
    const res = response();
    await FeedbackController.save({ body: { material: 'm1', supplier: 'c1', receiver: 'u1', text: 'ok' } }, res);
    assert.equal(res.statusCode, 201);
    assert.equal(res.ended, true);
});

test('SearchController encaminha query ao service', async (t) => {
    t.mock.method(SearchService, 'getByText', async (query) => ({ query }));
    const res = response();
    await SearchController.getByText({ query: { query: 'papel' } }, res);
    assert.deepEqual(res.body, { query: 'papel' });
});

test('UserController.update preserva o status de erro do service', async (t) => {
    t.mock.method(UserService, 'update', async () => { throw Object.assign(new Error('user not found'), { statusCode: 404 }); });
    const res = response();
    await UserController.update({ userId: 'user-1', body: { name: 'Ana', email: 'ana@example.com' } }, res);
    assert.equal(res.statusCode, 404);
    assert.deepEqual(res.body, { message: 'user not found' });
});
