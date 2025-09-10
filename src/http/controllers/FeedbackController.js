import FeedbackService from "../../application/services/FeedbackService.js";

class FeedbackController {
    static async save(req, res) {
        try {
            const { material,
                supplier,
                receiver,
                text
             } = req.body;

            await FeedbackService.save({ material, supplier, receiver, text });

            return res.status(201).end();
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
}

export default FeedbackController;