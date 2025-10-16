import dotenv from 'dotenv';
dotenv.config();
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

        console.log('Dados antigos removidos...');

        const createdCompanies = await Company.insertMany(companies);
        console.log(`${createdCompanies.length} companies criadas`);

        const createdUsers = await User.insertMany(users);

        const ruanUser = createdUsers.find(user => user.email === 'cop30@gmail.com');
        const mariaUser = createdUsers.find(user => user.email === 'maria.silva@example.com');
        const joaoUser = createdUsers.find(user => user.email === 'joao.pereira@example.com');

        console.log(`${createdUsers.length} users criados`);

        const createdMaterials = await Material.insertMany(materials);
        console.log(`${createdMaterials.length} materiais criados`);

        const sampleProjects = projects.map((project, index) => {
            let user;

            if (index === 0 || index === 2 || index === 4) {
                user = ruanUser._id;
            } else if (index === 1) {
                user = mariaUser._id;
            } else {
                user = joaoUser._id;
            }

            return {
                ...project,
                user, 
            };
        });

        const createdProjects = await Project.insertMany(sampleProjects);
        console.log(`🏗️ ${createdProjects.length} projetos sustentáveis criados`);

        const favoritesToCreate = [
            { user: ruanUser._id, onModel: 'Project', reference: createdProjects[0]._id },
            { user: ruanUser._id, onModel: 'Project', reference: createdProjects[2]._id }, 
            { user: ruanUser._id, onModel: 'Project', reference: createdProjects[4]._id }, 

            { user: ruanUser._id, onModel: 'Material', reference: createdMaterials[0]._id }, 
            { user: ruanUser._id, onModel: 'Material', reference: createdMaterials[2]._id },

            { user: mariaUser._id, onModel: 'Project', reference: createdProjects[1]._id },
            { user: joaoUser._id, onModel: 'Project', reference: createdProjects[3]._id }, 
        ];

        await Favorite.insertMany(favoritesToCreate);


        const ruanProjects = createdProjects.filter(project =>
            project.user.toString() === ruanUser._id.toString()
        );

        ruanProjects.forEach((project, index) => {
            console.log(`${index + 1}. ${project.title} (${project.difficulty})`);
        });

        console.log('\n RESUMO GERAL:');
        console.log(`Companies: ${createdCompanies.length}`);
        console.log(`Users: ${createdUsers.length}`);
        console.log(`Materiais: ${createdMaterials.length}`);
        console.log(`Projetos: ${createdProjects.length}`);
        console.log(`Favoritos: ${favoritesToCreate.length}`);

        process.exit();

    } catch (error) {
        console.error(`Erro no seeding: ${error.message}`);
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

        console.log('Todos os dados foram removidos!');
        process.exit();
    } catch (error) {
        console.error(`Erro ao destruir dados: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}