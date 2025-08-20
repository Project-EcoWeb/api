export default async (req, res, next) => {
    const types = ['project', 'material'];

    const queryParams = Object.values(req.query);

    if (queryParams.length === 0) {
        return next();
    }
    
    if (!(queryParams.length === 1 && types.includes(queryParams[0]))) {
        return res.status(400).json({ message: 'incorrect query params' });
    }

    return next();
}