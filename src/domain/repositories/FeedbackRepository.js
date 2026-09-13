import Feedback from "../model/Feedback.js";

class FeedbackRepository{
    static async create(data) {
        return await Feedback.create(data);
    }
}

export default FeedbackRepository;