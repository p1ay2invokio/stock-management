import { DataSource } from "typeorm";
import {join} from 'path'


export const appDataSource = new DataSource({
    type: 'mssql',
    database: 'ssl_project',
    synchronize: false,
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    host: 'localhost',
    logging: true,
    username: 'sa',
    password: '123456',
    options:{
        trustServerCertificate: true
    }
})

appDataSource.initialize().then(()=>{
    console.log("appDataSource is initialized!")
})