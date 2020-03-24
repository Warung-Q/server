const { News } = require('../models')

class NewsController {
  static findAll(req, res, next) {
    let WarungId = req.WarungId
    News.findAll({ where: { WarungId } })
      .then(news => {
        res.status(200).json(news)
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteNews(req, res, next) {
    let id = +req.params.id
    News.destroy({ where: { id } })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = NewsController
