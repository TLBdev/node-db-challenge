const db = require('../data/db-config.js')
module.exports = {
    find,
    add,
    remove
}

function find() {
    return db('projects')
}

function add(newScheme, id) {
    return db('projects').insert(newScheme).where("id", id)
}


function remove(id) {
    return db('projects').where("id", id).del()
}