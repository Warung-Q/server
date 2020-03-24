const { Warung, Product } = require('../models')

class WarungController {
  static findAll(req, res, next) {
    Warung.findAll({
      where: {
        OwnerId: req.OwnerId
      },
      include: Product
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static create(req, res, next) {
    Warung.create({
      name: req.body.name,
      OwnerId: req.OwnerId,
      ManagerId: req.body.managerId
    })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static findOne(req, res, next) {
    Warung.findOne({
      where: {
        id: req.params.id
      },
      include: Product
    })
      .then(data => {
        if (data) {
          res.status(200).json(data)
        } else {
          res.status(404).json({
            err: 'Data not Found'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static update(req, res, next) {
    Warung.update(
      {
        name: req.body.name,
        OwnerId: req.OwnerId,
        ManagerId: req.body.ManagerId
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(data => {
        if (data) {
          res.status(201).json({
            msg: 'Warung updated successfully'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static async destroy(req, res, next) {
    let id = +req.params.id
    let data = await Warung.destroy({ where: { id } })
    res.status(200).json({
      data,
      msg: 'Warung deleted successfully'
    })
  }
}

module.exports = WarungController
