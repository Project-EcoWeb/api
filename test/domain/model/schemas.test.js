import assert from 'node:assert/strict';
import test from 'node:test';
import Company from '../../../src/domain/model/Company.js';
import Favorite from '../../../src/domain/model/Favorite.js';
import Feedback from '../../../src/domain/model/Feedback.js';
import Project from '../../../src/domain/model/Project.js';
import User from '../../../src/domain/model/User.js';

const objectId = '507f1f77bcf86cd799439011';

test('User normaliza e-mail para minúsculas e rejeita formato inválido', async () => {
    const user = new User({ name: 'Ana', email: 'ANA@EXAMPLE.COM', password: 'secret' });
    await user.validate();
    assert.equal(user.email, 'ana@example.com');

    await assert.rejects(
        new User({ name: 'Ana', email: 'invalid', password: 'secret' }).validate(),
        (error) => error.name === 'ValidationError' && Boolean(error.errors.email)
    );
});

test('Company exige CNPJ, telefone e CEP em formatos válidos', async () => {
    const company = new Company({
        name: 'Eco Ltda', cnpj: 'invalid', phone: 'invalid', location: 'Boa Vista',
        cep: 'invalid', email: 'eco@example.com', password: 'secret'
    });

    await assert.rejects(company.validate(), (error) => {
        assert.ok(error.errors.cnpj);
        assert.ok(error.errors.phone);
        assert.ok(error.errors.cep);
        return true;
    });
});

test('Project exige dificuldade pertencente ao domínio', async () => {
    const project = new Project({
        title: 'Vaso', user: objectId, image: 'image.jpg', description: 'Reuso',
        materials: ['garrafa'], stages: ['cortar'], category: 'decoração', difficulty: 'Avançado'
    });

    await assert.rejects(project.validate(), (error) => error.name === 'ValidationError' && Boolean(error.errors.difficulty));
});

test('Favorite aceita somente Project ou Material como modelo referenciado', async () => {
    const favorite = new Favorite({ user: objectId, onModel: 'User', reference: objectId });

    await assert.rejects(favorite.validate(), (error) => error.name === 'ValidationError' && Boolean(error.errors.onModel));
});

test('Feedback exige material, fornecedor e recebedor', async () => {
    const feedback = new Feedback({ text: 'Obrigado' });

    await assert.rejects(feedback.validate(), (error) => {
        assert.ok(error.errors.material);
        assert.ok(error.errors.supplier);
        assert.ok(error.errors.receiver);
        return true;
    });
});
