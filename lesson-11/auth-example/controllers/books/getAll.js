const {Book} = require("../../models/book")

const getAll = async(req, res) => {
    const {_id: owner} = req.user;
    const {page = 1, limit = 10, ...query} = req.query;
    const skip = (page - 1) * limit;
    const result = await Book.find({owner, ...query}, "-createdAt -updatedAt", {skip, limit})
                                .populate("owner", "name email");
    res.json(result);
}

module.exports = getAll;