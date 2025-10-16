import dotenv from 'dotenv';

import User from '../../domain/model/User.js';
import Project from '../../domain/model/Project.js';
import Material from '../../domain/model/Material.js';
import Favorite from '../../domain/model/Favorite.js';
import Company from '../../domain/model/Company.js';

import { users } from './data/users.js';
import { materials } from './data/materials.js';
import { projects } from './data/projects.js';
import { companies } from './data/company.js';

import '../db/index.js';

const importData = async () => {
    try {
        await Favorite.deleteMany();
        await Project.deleteMany();
        await Material.deleteMany();
        await User.deleteMany();
        await Company.deleteMany();

        const createdCompanies = await Company.insertMany(companies);
        const company1 = createdCompanies[0];
        const company2 = createdCompanies[1];

        const createdUsers = await User.insertMany(users);
        const user1 = createdUsers[0];
        const user2 = createdUsers[1];

        const sampleMaterials = materials.map(material => {
            const company = material.category === 'Ferro' ? company2._id : company1._id;

            return {
                ...material,
                company
            };
        });

        const createdMaterials = await Material.insertMany(sampleMaterials);

        const sampleProjects = projects.map((project, index) => {
            const user = index === 0 ? user2._id : user1._id;
            const projectMaterials = index === 0
                ? createdMaterials.map(m => m._id)
                : [createdMaterials[0]._id];

            return {
                ...project,
                user,
                materials: projectMaterials
            };
        });

        const createdProjects = await Project.insertMany(sampleProjects);

        const favoritesToCreate = [
            { user: user1._id, onModel: 'Project', reference: createdProjects[0]._id },
            { user: user1._id, onModel: 'Material', reference: createdMaterials[1]._id },
            { user: user2._id, onModel: 'Project', reference: createdProjects[0]._id }
        ];

        await Favorite.insertMany(favoritesToCreate);

        console.log('Database seeded successfully!');
        console.log(`${createdCompanies.length} companies created`);
        console.log(`${createdUsers.length} users created`);
        console.log(`${createdMaterials.length} materials created`);
        console.log(`${createdProjects.length} projects created`);
        console.log(` ${favoritesToCreate.length} favorites created`);

        process.exit();

    } catch (error) {
        console.error(` Erro: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Favorite.deleteMany();
        await Project.deleteMany();
        await Material.deleteMany();
        await User.deleteMany();
        await Company.deleteMany(); 

        console.log('All data destroyed!');
        process.exit();
    } catch (error) {
        console.error(`Erro: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}