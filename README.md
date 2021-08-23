# Setup
1. Have NodeJS installed.
2. Have PostgreSQL installed.
3. Have a PostgreSQL string with passport_auth as database to connect to.

Inside main directory:

4. Run "npm install".
5. Create a ".env" file with "DB_STRING", "LOCAL_SECRET" and "PORT" variables defined.
6. Run the following commands in your psql shell in the right order:\
```psql -U your_pg_username -f createDatabase.sql``` [Create passport_auth database.]()\
```psql -U your_pg_username passport_auth < createTable.sql``` [Create users table.]()\
```psql -U your_pg_username passport_auth < node_modules/connect-pg-simple/table.sql``` [Create session table.]()
7. Run "npm run start".