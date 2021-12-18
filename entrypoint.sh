#!/usr/bin/env bash

cd server
npx sequelize db:migrate
npx sequelize db:seed:undo:all
npx sequelize db:seed:all
cd ..
npm run start-server
