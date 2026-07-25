import assert from 'node:assert/strict';
import test from 'node:test';
import CompanyService from '../../../src/application/services/CompanyService.js';
import CompanyRepository from '../../../src/domain/repositories/CompanyRepository.js';
import CompanyValidator from '../../../src/application/validations/CompanyValidator.js';
import MaterialService from '../../../src/application/services/MaterialService.js';

test('CompanyService.update atualiza somente campos permitidos', async (t) => {
    t.mock.method(CompanyValidator, 'isExists', async () => true);
    t.mock.method(CompanyRepository, 'findById', async () => ({
        id: 'company-1', name: 'Eco Ltda', email: 'eco@example.com', cnpj: '123'
    }));
    t.mock.method(CompanyRepository, 'findByName', async () => null);
    let received;
    t.mock.method(CompanyRepository, 'update', async (data) => { received = data; });

    await CompanyService.update({
        id: 'company-1',
        company: { name: 'Eco Web', phone: '99999-9999', password: 'not-allowed' }
    });

    assert.deepEqual(received, {
        id: 'company-1',
        company: { name: 'Eco Web', phone: '99999-9999' }
    });
});

test('CompanyService.update rejeita campos de perfil duplicados', async (t) => {
    t.mock.method(CompanyValidator, 'isExists', async () => true);
    t.mock.method(CompanyRepository, 'findById', async () => ({
        id: 'company-1', name: 'Eco Ltda', email: 'eco@example.com', cnpj: '123'
    }));
    t.mock.method(CompanyRepository, 'findByEmail', async () => ({ id: 'company-2' }));

    await assert.rejects(
        CompanyService.update({ id: 'company-1', company: { email: 'other@example.com' } }),
        (error) => error.statusCode === 409 && error.message === 'company with this email already registered'
    );
});

test('CompanyService.update rejeita corpo sem campos atualizáveis', async (t) => {
    t.mock.method(CompanyValidator, 'isExists', async () => true);

    await assert.rejects(
        CompanyService.update({ id: 'company-1', company: { password: 'secret' } }),
        (error) => error.statusCode === 400 && error.message === 'body is invalid'
    );
});

test('CompanyService.getProfileById rejeita empresa inexistente', async (t) => {
    t.mock.method(CompanyValidator, 'isExists', async () => false);

    await assert.rejects(
        CompanyService.getProfileById('company-1'),
        (error) => error.statusCode === 404 && error.message === 'User not exists'
    );
});

test('CompanyService.getProfileById agrega materiais ao perfil da empresa', async (t) => {
    t.mock.method(CompanyValidator, 'isExists', async () => true);
    t.mock.method(CompanyRepository, 'findById', async () => ({
        toObject: () => ({ id: 'company-1', name: 'Eco Ltda' })
    }));
    t.mock.method(MaterialService, 'findByUser', async () => [{ id: 'material-1' }]);

    assert.deepEqual(await CompanyService.getProfileById('company-1'), {
        id: 'company-1', name: 'Eco Ltda', materials: [{ id: 'material-1' }]
    });
});
