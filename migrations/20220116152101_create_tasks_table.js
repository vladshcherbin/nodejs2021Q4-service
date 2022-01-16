export function up(knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.string('title').notNullable()
    table.integer('order')
    table.string('description')
    table.uuid('userId')
    table.uuid('boardId')
    table.uuid('columnId')

    table.foreign('userId').references('users.id').onUpdate('CASCADE').onDelete('SET NULL')
    table.foreign('boardId').references('boards.id').onUpdate('CASCADE').onDelete('CASCADE')
  })
}

export function down(knex) {
  return knex.schema.dropTable('tasks')
}
