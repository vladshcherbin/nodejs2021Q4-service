export function up(knex) {
  return knex.schema.createTable('boards', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.string('title').notNullable()
    table.jsonb('columns').notNullable()
  })
}

export function down(knex) {
  return knex.schema.dropTable('boards')
}
