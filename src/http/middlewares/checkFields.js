export default async (req, res, next) => {


    if (req.query.q === 'company') {
        const fields = ['emailOrCnpj', 'password'];
        fields.forEach((field) => {
            if (!req.body[field] && fields.includes(field)) {
                return res.status(400).json({ message: `missing ${field} field` });
            }
        })
        return next();
    }

    const fields = ['email', 'password'];

    fields.forEach((field) => {
        if (!req.body[field] && fields.includes(field)) {
            return res.status(400).json({ message: `missing ${field} field` });
        }
    })

    return next();
    
} 