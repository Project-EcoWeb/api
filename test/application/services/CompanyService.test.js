import assert from 'node:assert/strict';
import test from 'node:test';
import CompanyService from '../../../src/application/services/CompanyService.js';
import CompanyRepository from '../../../src/domain/repositories/CompanyRepository.js';
import CompanyValidator from '../../../src/application/validations/CompanyValidator.js';
import MaterialService from '../../../src/application/services/MaterialService.js';

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
