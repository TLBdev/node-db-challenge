
exports.up = function (knex) {
    return knex.schema
        .createTable('resources', tbl => {
            tbl.increments()
            tbl.string('resource_name')
                .notNullable()
            tbl.string('description')

        })
        .createTable('projects', tbl => {
            tbl.increments()
            tbl.string('project_name')
                .notNullable()
            tbl.string('description')
            tbl.boolean('completed')
                .defaultTo(false)
                .notNullable()

        })
        .createTable('tasks', tbl => {
            tbl.increments()
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('projects')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.string('task_description')
                .notNullable()
            tbl.string('notes')
            tbl.boolean('completed')
                .defaultTo(false)
                .notNullable()

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
    return knex.schema
        .dropTableIfExists('project_resource')
        .dropTableIfExists('tasks')
        .dropTableIfExists('projects')
        .dropTableIfExists('resources')
};
