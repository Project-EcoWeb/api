import assert from 'node:assert/strict';
import test from 'node:test';
import checkTypeFavorite from '../../../src/http/middlewares/checkTypeFavorite.js';

function response() {
    return {
        body: undefined,
        statusCode: undefined,
        status(statusCode) {
            this.statusCode = statusCode;
            return this;
        },
        json(body) {
            this.body = body;
            return this;
        }
    };
}

test('checkTypeFavorite permite requisição sem filtro', async () => {
    let nextCalled = false;

    await checkTypeFavorite({ query: {} }, response(), () => { nextCalled = true; });

    assert.equal(nextCalled, true);
});

test('checkTypeFavorite permite apenas um filtro project ou material', async () => {
    let nextCalled = false;

    await checkTypeFavorite({ query: { type: 'project' } }, response(), () => { nextCalled = true; });

    assert.equal(nextCalled, true);
});

test('checkTypeFavorite rejeita filtro desconhecido ou múltiplos filtros', async () => {
    for (const query of [{ type: 'user' }, { type: 'project', page: '1' }]) {
        const res = response();
        let nextCalled = false;

        await checkTypeFavorite({ query }, res, () => { nextCalled = true; });

        assert.equal(res.statusCode, 400);
        assert.deepEqual(res.body, { message: 'incorrect query params' });
        assert.equal(nextCalled, false);
    }
});
