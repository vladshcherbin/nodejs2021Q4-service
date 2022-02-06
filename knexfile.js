import 'dotenv/config'

export default {
  client: 'pg',
  connection: process.env.DATABASE_URL
}
