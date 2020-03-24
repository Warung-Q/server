const { Category } = require('../models')

class CategoryController {
  static async findAll(req, res, next) {
    let Categories = await Category.findAll()
    res.status(200).json(Categories)
  }
}

module.exports = CategoryController
