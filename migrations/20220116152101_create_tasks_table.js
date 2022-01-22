export function up(knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.uuid('board_id')
    table.uuid('column_id')
    table.uuid('user_id')
    table.string('title').notNullable()
    table.integer('order')
    table.string('description')

    table.foreign('user_id').references('users.id').onUpdate('CASCADE').onDelete('SET NULL')
    table.foreign('board_id').references('boards.id').onUpdate('CASCADE').onDelete('CASCADE')
  })
}

export function down(knex) {
  return knex.schema.dropTable('tasks')
}
