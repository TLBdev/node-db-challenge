const db = require('../data/db-config.js')
module.exports = {
    find,
    findResources,
    findTask,
    add,
    addResource,
    addTask,
    remove,
    findById
}

function find() {
    return db('projects')
}

function findById(id) {

}

function findTask() {
    return db('tasks')
        .join('projects', 'projects.id', 'tasks.project_id')
        .select('tasks.id', 'projects.project_name', 'projects.description', 'tasks.task_description', 'tasks.notes', 'tasks.completed')
}
function findResources() {
    return db('resources')
}
function add(newProject) {
    return db('projects').insert(newProject)
}
function addTask(newTask, id) {
    let payload = {
        ...newTask,
        project_id: id
    }
    console.log(payload)
    return db('tasks').insert(payload)
}
function addResource(newProject) {
    return db('resources').insert(newProject)
}

function remove(id) {
    return db('projects').where("id", id).del()
}