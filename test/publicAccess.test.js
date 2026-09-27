import assert from 'node:assert/strict';
import test from 'node:test';
import authentication from '../src/http/middlewares/auth.js';
import projectRoutes from '../src/http/routes/projectRoutes.js';
import materialRoutes from '../src/http/routes/materialRoutes.js';
import userRoutes from '../src/http/routes/userRoutes.js';
import companyRoutes from '../src/http/routes/companyRoutes.js';
import feedbackRoutes from '../src/http/routes/feedbackRoutes.js';
import Material from '../src/domain/model/Material.js';
import MaterialRepository from '../src/domain/repositories/MaterialRepository.js';
import ProjectRepository from '../src/domain/repositories/ProjectRepository.js';
import MaterialService from '../src/application/services/MaterialService.js';
import CompanyService from '../src/application/services/CompanyService.js';
import UserService from '../src/application/services/UserService.js';
import SearchService from '../src/application/services/SearchService.js';
import CompanyRepository from '../src/domain/repositories/CompanyRepository.js';
import UserRepository from '../src/domain/repositories/UserRespository.js';

const userId = '507f1f77bcf86cd799439011';
const companyId = '507f1f77bcf86cd799439012';
const materialId = '507f1f77bcf86cd799439013';

function route(router, method, path) {
    const layer = router.stack.find((item) => item.route?.path === path && item.route.methods[method]);
    assert.ok(layer, `${method.toUpperCase()} ${path} não encontrado`);
    return layer.route;
}

test('somente consultas públicas dispensam JWT; operações pessoais e de escrita o exigem', () => {
    const publicRoutes = [
        [projectRoutes, 'get', '/'],
        [projectRoutes, 'get', '/:id'],
        [materialRoutes, 'get', '/'],
        [materialRoutes, 'get', '/:id'],
        [userRoutes, 'get', '/:id/profile'],
        [companyRoutes, 'get', '/:id/profile']
    ];
    const protectedRoutes = [
        [projectRoutes, 'post', '/'],
        [projectRoutes, 'get', '/me'],
        [projectRoutes, 'post', '/favorites'],
        [materialRoutes, 'post', '/'],
        [materialRoutes, 'get', '/me'],
        [materialRoutes, 'get', '/me/:id'],
        [materialRoutes, 'get', '/search'],
        [materialRoutes, 'post', '/favorites'],
        [materialRoutes, 'patch', '/:id'],
        [materialRoutes, 'patch', '/:id/update-status'],
        [materialRoutes, 'delete', '/:id'],
        [userRoutes, 'patch', '/'],
        [userRoutes, 'get', '/me/profile'],
        [userRoutes, 'get', '/favorites'],
        [userRoutes, 'get', '/count-projects'],
        [userRoutes, 'get', '/count-favorites'],
        [companyRoutes, 'patch', '/'],
        [companyRoutes, 'get', '/me/profile'],
        [feedbackRoutes, 'post', '/']
    ];

    for (const [router, method, path] of publicRoutes) {
        assert.ok(!route(router, method, path).stack.some((layer) => layer.handle === authentication));
    }
    for (const [router, method, path] of protectedRoutes) {
        assert.equal(route(router, method, path).stack[0].handle, authentication);
    }
});

test('consultas públicas de materiais filtram status e limitam campos da instituição', async (t) => {
    const queries = [];
    const chain = {
        select(fields) { this.fields = fields; return this; },
        populate(options) { this.population = options; return this; },
        sort(options) { this.sorting = options; return this; },
        limit(count) { this.count = count; return this; },
        then(resolve) { resolve([]); }
    };
    t.mock.method(Material, 'find', (filter) => { queries.push(filter); return chain; });
    t.mock.method(Material, 'findOne', (filter) => { queries.push(filter); return chain; });

    await MaterialRepository.findAll();
    assert.deepEqual(queries.at(-1), { status: 'publicado' });
    assert.deepEqual(chain.population, { path: 'company', select: 'name logo location' });
    assert.ok(!chain.fields.includes('removedBy'));

    await MaterialRepository.findThreeLast();
    assert.deepEqual(queries.at(-1), { status: 'publicado' });
    assert.deepEqual(chain.sorting, { createdAt: -1 });
    assert.equal(chain.count, 3);

    await MaterialRepository.findPublishedByUser(companyId);
    assert.deepEqual(queries.at(-1), { company: companyId, status: 'publicado' });

    await MaterialRepository.findAllByContainsText('garrafa');
    assert.deepEqual(queries.at(-1), { name: { $regex: 'garrafa', $options: 'i' }, status: 'publicado' });

    await MaterialRepository.findPublishedById(materialId);
    assert.deepEqual(queries.at(-1), { _id: materialId, status: 'publicado' });
    assert.deepEqual(chain.population, { path: 'company', select: 'name logo location' });
});

test('detalhe público oculta material indisponível e detalhe privado verifica propriedade', async (t) => {
    t.mock.method(MaterialRepository, 'findPublishedById', async () => null);
    await assert.rejects(MaterialService.getPublishedById(materialId), { statusCode: 404 });

    t.mock.method(MaterialRepository, 'findById', async () => ({ company: { _id: companyId }, status: 'pausado' }));
    await assert.rejects(MaterialService.getOwnedById({ id: materialId, user: userId }), { statusCode: 403 });
    assert.equal((await MaterialService.getOwnedById({ id: materialId, user: companyId })).status, 'pausado');
});

test('perfis públicos usam listas explícitas de campos e materiais publicados', async (t) => {
    t.mock.method(UserRepository, 'findById', async () => ({ id: userId, name: 'Ana', email: 'ana@example.com' }));
    t.mock.method(ProjectRepository, 'findByUser', async () => [{ _id: materialId, title: 'Vaso' }]);
    t.mock.method(CompanyRepository, 'findById', async () => ({
        _id: companyId, name: 'Eco', logo: 'logo.jpg', location: 'Centro',
        cnpj: '123', email: 'eco@example.com', phone: '9999', responsibleName: 'Carlos'
    }));
    t.mock.method(MaterialService, 'findPublishedByUser', async () => [{ _id: materialId, status: 'publicado' }]);

    assert.deepEqual(await UserService.findPublicById(userId), {
        user: { id: userId, name: 'Ana', numberProjects: 1, projects: [{ _id: materialId, title: 'Vaso' }] }
    });
    assert.deepEqual(await CompanyService.getPublicProfileById(companyId), {
        _id: companyId, name: 'Eco', logo: 'logo.jpg', location: 'Centro',
        materials: [{ _id: materialId, status: 'publicado' }]
    });
});

test('busca pública interpreta pontuação literalmente e limita o tamanho da consulta', async (t) => {
    const received = [];
    t.mock.method(ProjectRepository, 'findAllByContainsText', async (text) => { received.push(text); return []; });
    t.mock.method(MaterialRepository, 'findAllByContainsText', async (text) => { received.push(text); return []; });

    const result = await SearchService.getByText('PET.*');
    assert.equal(result.query, 'PET.*');
    assert.deepEqual(received, ['PET\\.\\*', 'PET\\.\\*']);
    await assert.rejects(SearchService.getByText('a'.repeat(101)), { statusCode: 400 });
    await assert.rejects(SearchService.getByText(['PET']), { statusCode: 400 });
});
