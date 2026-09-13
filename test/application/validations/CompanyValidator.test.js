import assert from 'node:assert/strict';
import test from 'node:test';
import CompanyValidator from '../../../src/application/validations/CompanyValidator.js';
import CompanyRepository from '../../../src/domain/repositories/CompanyRepository.js';

test('CompanyValidator.isExistsByName consulta a empresa pelo nome', async (t) => {
    let received;
    t.mock.method(CompanyRepository, 'findByName', async (name) => {
        received = name;
        return { id: 'company-1' };
    });

    assert.equal(await CompanyValidator.isExistsByName('Eco Ltda'), true);
    assert.equal(received, 'Eco Ltda');
});

test('CompanyValidator.isExistsByEmailOrCnpj identifica registro inexistente', async (t) => {
    t.mock.method(CompanyRepository, 'findByEmailOrCnpj', async () => null);

    assert.equal(await CompanyValidator.isExistsByEmailOrCnpj({ email: 'eco@example.com', cnpj: '123' }), false);
});
