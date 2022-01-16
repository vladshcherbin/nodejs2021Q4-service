export function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.string('name').notNullable()
    table.string('login')
    table.string('password')
  })
}

export function down(knex) {
  return knex.schema.dropTable('users')
}
