export default async (req, res, next) => {
    const fields = req.query.q === 'company'
        ? ['emailOrCnpj', 'password']
        : ['email', 'password'];

    for (const field of fields) {
        if (!req.body[field]) {
            return res.status(400).json({ message: `missing ${field} field` });
        }
    }

    return next();
}
