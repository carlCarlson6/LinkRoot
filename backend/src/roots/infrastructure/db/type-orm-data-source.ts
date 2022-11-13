import 'reflect-metadata'
import { config as readEnvConfig } from "dotenv";
import { DataSource, EntitySchema, MixedList } from "typeorm"
import { RootEntity } from './root-entity';
import { Link } from '../../link';
import { LinkEntity } from './link-entity';

export interface TypeOrmDataSourceConfig {
    type: "postgres",
    host: string,
    port: number,
    username: string,
    password: string,
    database: string,
    entities: MixedList<string | Function | EntitySchema<any>> | undefined,
    synchronize: boolean,
}

const readTypeOrmDataSourceConfig = (): TypeOrmDataSourceConfig => {
    readEnvConfig();
    const config: TypeOrmDataSourceConfig = {
        type: "postgres",
        host: process.env.postgress_host!,
        port: Number(process.env.postgress_port!),
        username: process.env.postgress_username!,
        password: process.env.postgress_password!,
        database: process.env.postgress_database!,
        entities: [RootEntity, LinkEntity],
        synchronize: true,
    };
    console.log("type orm config", config);
    return config;
};
const buildDataSource = (config: TypeOrmDataSourceConfig) => new DataSource({...config});

export const getDataSource = () => buildDataSource(readTypeOrmDataSourceConfig());