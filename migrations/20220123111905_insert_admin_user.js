import bcrypt from 'bcrypt'

export async function up(knex) {
  return knex.table('users').insert({
    name: 'Bart',
    login: 'admin',
    password: await bcrypt.hash('admin', 12)
  })
}

export function down(knex) {
  return knex.table('users').where('login', 'admin').del()
}
