# SEAN.js E2E admin project

This project contains an API as well as an administrative interface that allows to view and manage groups, scopes, and users.

## Prerequisites

1. Node.js
2. PostgreSQL server

## Instructions

1. Run `npm install -g @angular/cli`.
2. Run `npm install`.
3. Obtain `.env` file from the project owner and chagne `DB_*` configuration.
4. Run `/sql/bootstrap.sql` in your PostgreSQL database.
5. Run `npm start-local` for a local environment; WebPack will build Angular2 project and node will serve up the application at `http://localhost/`.

## Stack

- Angular2 (v5+)
- WebPack 3
- Boostrap
- Node.js
- Express.js
- Sequalize.js
- PostgreSQL

## Code location

Front-end code is located within `/src/web`.
Back-end code is located in `/src/`.

## API Docs (under construction)

https://auth02.docs.apiary.io/#