const bcrypt = require('bcryptjs')

class HashBcrypt {
    static hash(password) {
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)
        return hash
    }

    static check(password, hashPassword) {
        return bcrypt.compareSync(password, hashPassword)
    }
}

module.exports = HashBcrypt