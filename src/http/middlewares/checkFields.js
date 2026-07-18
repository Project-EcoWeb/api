export default async (req, res, next) => {


    if (req.query.q === 'company') {
        const fields = ['emailOrCnpj', 'password'];
        for (const field of fields) {
            if (!req.body[field]) {
                return res.status(400).json({ message: `missing ${field} field` });
            }
        }
        return next();
    }

    const fields = ['email', 'password'];

    for (const field of fields) {
        if (!req.body[field]) {
            return res.status(400).json({ message: `missing ${field} field` });
        }
    }

    return next();
    
}
