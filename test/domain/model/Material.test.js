import assert from 'node:assert/strict';
import test from 'node:test';
import Material from '../../../src/domain/model/Material.js';

const validMaterial = {
    name: 'Papelão',
    description: 'Caixas limpas para reaproveitamento',
    location: 'Boa Vista',
    quantity: 3,
    category: 'papel',
    unitOfMeasure: 'caixas',
    company: '507f1f77bcf86cd799439011'
};

test('Material aplica o status padrão publicado', () => {
    const material = new Material(validMaterial);

    assert.equal(material.status, 'publicado');
});

test('Material rejeita quantidade menor que um', async () => {
    const material = new Material({ ...validMaterial, quantity: 0 });

    await assert.rejects(material.validate(), (error) => {
        assert.equal(error.name, 'ValidationError');
        assert.match(error.errors.quantity.message, /one quantity is required/);
        return true;
    });
});

test('Material rejeita status fora do domínio', async () => {
    const material = new Material({ ...validMaterial, status: 'rascunho' });

    await assert.rejects(material.validate(), (error) => {
        assert.equal(error.name, 'ValidationError');
        assert.match(error.errors.status.message, /is not a valid enum value/);
        return true;
    });
});
