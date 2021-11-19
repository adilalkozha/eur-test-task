# eur-test-task

## Technologies Used
1. NodeJS - Languages
2. ExpressJS - FrameWorks
3. PSQL - Database
4. Sequlize - ORM 
5. OpenApi(swagger) - api's docs

## Database Setup

1.Install psql

2.Create new database and user with role

```psql
CREATE DATABASE eurbank;
CREATE USER eurbank WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE eurbank to eurbank;