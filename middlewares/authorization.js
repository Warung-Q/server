const {
    Warung
} = require('../models')

module.exports = {
    authorize: (req, res, next) => {
        try {
            Warung.findOne({
                where: {
                    id: req.params.id
                }
            })
                .then(data => {
                    if (data) {
                        if (data.OwnerId === req.OwnerId) {
                            next()
                        } else {
                            let err = {
                                name: "NOT AUTHORIZED",
                                msg: "YOU ARE NOT AUTHORIZE TO DO THIS ACTION"
                            }
                            next(err)
                        }
                    } 
                })
                .catch(err => {
                    next(err)
                })
        }
        catch(err) {
            next(err)
        }
    }
}