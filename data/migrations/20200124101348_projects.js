
exports.up = function (knex) {
    return knex.schema
        .createTable('resources', tbl => {
            tbl.increments()


        })
        .createTable('projects', tbl => {
            tbl.increments()

        })
        .createTable('task', tbl => {
            tbl.increments()
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('projects')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');

        })
        .createTable('project_resource', tbl => {
            tbl.increments()
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('projects')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.integer('resources_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('resources')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');

        })
};

exports.down = function (knex) {

};
