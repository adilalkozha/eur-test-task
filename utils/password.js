const bcrypt = require('bcrypt')

module.exports.hashPassword = (password) => {
    return new Promise((res, rej) => {
        bcrypt.hash(password,10,(err, encrypted) => {
            if(err){
                return reject(err)
            }
            resolve(encrypted)
        })
    })
}

module.exports.matchPassword = (hash,password) => {
    return new Promise((res, rej)=>{
        bcrypt.compare(password,hash,(err,same) => {
            if(err) return reject(err)
            resolve(same)
        })
    })
}