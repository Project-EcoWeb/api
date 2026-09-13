export default async (req, res, next) => {
    const fields = req.query.q === 'company'
        ? ['emailOrCnpj', 'password']
        : ['email', 'password'];

    const missingField = fields.find((field) => !req.body[field]);

    if (missingField) {
        return res.status(400).json({ message: `missing ${missingField} field` });
    }

    return next();
}
