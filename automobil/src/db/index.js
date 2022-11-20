import { Sequelize } from 'sequelize';

// Option 1: Passing a connection URI
const sequelize = new Sequelize('postgres://automobil:secret@127.0.0.1:5432/automobil?sslMode=disable');

export default sequelize;