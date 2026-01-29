export default async (req, res, next) => {

    const fields = ['email', 'password'];

    fields.forEach((field) => {
        if (!req.body[field] && fields.includes(field)) {
            return res.status(400).json({ message: `missing ${field} field` });
        }
    })

    return next();
    
} 