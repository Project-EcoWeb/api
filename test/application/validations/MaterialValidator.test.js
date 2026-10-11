import assert from 'node:assert/strict';
import test from 'node:test';
import MaterialValidator from '../../../src/application/validations/MaterialValidator.js';
import MaterialRepository from '../../../src/domain/repositories/MaterialRepository.js';

test('MaterialValidator.checkUser confirma a empresa proprietária do material', async (t) => {
    t.mock.method(MaterialRepository, 'findById', async () => ({ company: { id: 'company-1' } }));

    assert.equal(await MaterialValidator.checkUser({ id: 'material-1', user: 'company-1' }), true);
    assert.equal(await MaterialValidator.checkUser({ id: 'material-1', user: 'company-2' }), false);
});
