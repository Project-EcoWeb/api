import assert from 'node:assert/strict';
import test from 'node:test';
import FavoriteService from '../../../src/application/services/FavoriteService.js';
import FavoriteRepository from '../../../src/domain/repositories/FavoriteRepository.js';
import UserValidator from '../../../src/application/validations/UserValidator.js';

test('FavoriteService.countFavoritesByUser rejeita usuário inexistente', async (t) => {
    t.mock.method(UserValidator, 'isExists', async () => false);

    await assert.rejects(
        FavoriteService.countFavoritesByUser('user-1'),
        (error) => error.statusCode === 409 && error.message === 'User not exists'
    );
});

test('FavoriteService.countFavoritesByUser retorna a contagem do repositório', async (t) => {
    t.mock.method(UserValidator, 'isExists', async () => true);
    t.mock.method(FavoriteRepository, 'countFavoritesByUser', async () => 4);

    assert.equal(await FavoriteService.countFavoritesByUser('user-1'), 4);
});

test('FavoriteService.save delega o favorito ao repositório', async (t) => {
    const favorite = { user: 'user-1', onModel: 'Project', reference: 'project-1' };
    let saved;
    t.mock.method(FavoriteRepository, 'save', async (data) => { saved = data; });

    await FavoriteService.save(favorite);

    assert.deepEqual(saved, favorite);
});
