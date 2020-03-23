const cron = require('node-cron')
const {
    Product
} = require('../models')

function cron_expired() {
    let date1;
    let date2 = new Date()
    cron.schedule('0 0 * * *', () => {
        // console.log('cron running daily')
        Product.findAll({
            // where: {
            //     WarungId: req.WarungId
            // }
        })
            .then(result => {
                let output = result.map(el => {
                    date1 = new Date(el.expired_date)
                    let diffTime = date1.getTime() - date2.getTime() //date calculation in time
                    let diffDay = Math.ceil(diffTime / (1000 * 3600 * 24)) //date calucalation in days
                    if(diffDay <= 14){
                        return {
                            id: el.id,
                            name: el.name,
                            price: el.price,
                            stock: el.stock,
                            barcode: el.barcode,
                            expired_date: el.expired_date,
                            category: el.Category.name,
                            CategoryId: el.CategoryId
                        }
                    }
                })
                console.log(output)
                //send output to email via nodemailer here
            })
            .catch(err => {
                console.log(err)
            })
    })
}
  

module.exports = cron_expired()