"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDataSource = void 0;
const typeorm_1 = require("typeorm");
const path_1 = require("path");
exports.appDataSource = new typeorm_1.DataSource({
    type: 'mssql',
    database: 'ssl_project',
    synchronize: false,
    entities: [(0, path_1.join)(__dirname, '**', '*.entity.{ts,js}')],
    host: 'localhost',
    logging: true,
    username: 'sa',
    password: '123456',
    options: {
        trustServerCertificate: true
    }
});
exports.appDataSource.initialize().then(() => {
    console.log("appDataSource is initialized!");
});
