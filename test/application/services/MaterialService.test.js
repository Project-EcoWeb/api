import assert from 'node:assert/strict';
import test from 'node:test';
import MaterialService from '../../../src/application/services/MaterialService.js';
import MaterialRepository from '../../../src/domain/repositories/MaterialRepository.js';
import MaterialValidator from '../../../src/application/validations/MaterialValidator.js';

test('MaterialService.findByNameOrStatus rejeita status inválido', async () => {
    await assert.rejects(
        MaterialService.findByNameOrStatus('papel', 'rascunho', 'company-1'),
        (error) => error.statusCode === 400 && error.message === 'input status invalid'
    );
});

test('MaterialService.findByNameOrStatus busca por nome quando o status é all', async (t) => {
    const materials = [{ id: 'material-1', name: 'Papelão' }];
    let received;

    t.mock.method(MaterialRepository, 'findByNameAndUser', async (...args) => {
        received = args;
        return materials;
    });

    const result = await MaterialService.findByNameOrStatus('papel', 'all', 'company-1');

    assert.deepEqual(result, materials);
    assert.deepEqual(received, ['papel', 'company-1']);
});

test('MaterialService.findByNameOrStatus busca por status sem nome', async (t) => {
    const materials = [{ id: 'material-1', status: 'pausado' }];
    let received;

    t.mock.method(MaterialRepository, 'findByStatusAndUser', async (...args) => {
        received = args;
        return materials;
    });

    const result = await MaterialService.findByNameOrStatus(undefined, 'pausado', 'company-1');

    assert.deepEqual(result, materials);
    assert.deepEqual(received, ['pausado', 'company-1']);
});

test('MaterialService.updateStatus rejeita material inexistente antes de consultar autorização', async (t) => {
    t.mock.method(MaterialValidator, 'isExists', async () => false);
    const checkUser = t.mock.method(MaterialValidator, 'checkUser', async () => true);
    const updateStatus = t.mock.method(MaterialRepository, 'updateStatus', async () => {});

    await assert.rejects(
        MaterialService.updateStatus({ id: 'material-1', user: 'company-1', status: 'pausado' }),
        (error) => error.statusCode === 404 && error.message === 'material is not exists'
    );

    assert.equal(checkUser.mock.calls.length, 0);
    assert.equal(updateStatus.mock.calls.length, 0);
});

test('MaterialService.updateStatus rejeita empresa sem autorização', async (t) => {
    t.mock.method(MaterialValidator, 'isExists', async () => true);
    t.mock.method(MaterialValidator, 'checkUser', async () => false);
    const updateStatus = t.mock.method(MaterialRepository, 'updateStatus', async () => {});

    await assert.rejects(
        MaterialService.updateStatus({ id: 'material-1', user: 'company-2', status: 'pausado' }),
        (error) => error.statusCode === 403 && error.message === 'this material not is authorized'
    );

    assert.equal(updateStatus.mock.calls.length, 0);
});

test('MaterialService.updateStatus atualiza material autorizado', async (t) => {
    let received;

    t.mock.method(MaterialValidator, 'isExists', async () => true);
    t.mock.method(MaterialValidator, 'checkUser', async () => true);
    t.mock.method(MaterialRepository, 'updateStatus', async (data) => { received = data; });

    await MaterialService.updateStatus({ id: 'material-1', user: 'company-1', status: 'pausado' });

    assert.deepEqual(received, { id: 'material-1', status: 'pausado' });
});

test('MaterialService.getById rejeita material não encontrado', async (t) => {
    t.mock.method(MaterialRepository, 'findById', async () => null);

    await assert.rejects(
        MaterialService.getById({ id: 'material-1', user: 'company-1' }),
        (error) => error.statusCode === 404 && error.message === 'material not found'
    );
});
