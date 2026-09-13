import assert from 'node:assert/strict';
import test from 'node:test';
import FeedbackService from '../../../src/application/services/FeedbackService.js';
import FeedbackRepository from '../../../src/domain/repositories/FeedbackRepository.js';
import MaterialService from '../../../src/application/services/MaterialService.js';
import MaterialValidator from '../../../src/application/validations/MaterialValidator.js';
import UserValidator from '../../../src/application/validations/UserValidator.js';

test('FeedbackService.save rejeita material inexistente', async (t) => {
    t.mock.method(MaterialValidator, 'isExists', async () => false);

    await assert.rejects(
        FeedbackService.save({ material: 'material-1', receiver: 'user-2' }),
        (error) => error.statusCode === 403 && error.message === 'material is not exists'
    );
});

test('FeedbackService.save cria feedback e finaliza o material', async (t) => {
    let statusUpdate;
    t.mock.method(MaterialValidator, 'isExists', async () => true);
    t.mock.method(UserValidator, 'isExists', async () => true);
    t.mock.method(FeedbackRepository, 'create', async () => ({ material: 'material-1', supplier: 'company-1' }));
    t.mock.method(MaterialService, 'updateStatus', async (data) => { statusUpdate = data; });

    await FeedbackService.save({ material: 'material-1', supplier: 'company-1', receiver: 'user-2', text: 'Obrigado' });

    assert.deepEqual(statusUpdate, { id: 'material-1', user: 'company-1', status: 'doado' });
});
