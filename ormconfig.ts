const isProd = process.env.NODE_ENV === 'production'

module.exports = isProd ? {
  type: 'postgres',
  entities: [
    `${__dirname}/dist/**/*.entity{.ts,.js}`
  ],
  url: process.env.DATABASE_URL,
  'synchronize': true
} : {
  'name': 'default',
  'type': 'postgres',
  'host': 'localhost',
  'port': 5432,
  'username': 'postgres',
  'password': 'postgres',
  'database': 'postgres',
  'entities': ['./dist/**/**.entity{.ts,.js}'],
  'synchronize': true
}
