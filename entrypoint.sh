#!/usr/bin/env bash

cd server
npx sequelize db:migrate
cd ..
npm run start-server
