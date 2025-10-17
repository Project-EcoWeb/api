import bcrypt from "bcryptjs";


async function encodePassword(hash) {
    return await bcrypt.hash(hash, 8);
}

export const users = [
    {
        name: 'Ruan Oliveira',
        email: 'cop30@gmail.com',
        password: await encodePassword('admin'),
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8YPQEhQCjYMivaRcMJqhPm2vN_qQ5M2DdLx4Ofw_bMLLMrA4LAGngRyehMSGyUyoRVoE&usqp=CAU'
    },
    {
        name: 'Maria Silva',
        email: 'maria.silva@example.com',
        password: await encodePassword('password123'),
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
        name: 'João Pereira',
        email: 'joao.pereira@example.com',
        password: await encodePassword('password123'),
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    }
];