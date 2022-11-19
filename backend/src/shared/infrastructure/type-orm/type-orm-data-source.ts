import 'reflect-metadata'
import { config as readEnvConfig } from "dotenv";
import { DataSource, EntitySchema, MixedList } from "typeorm"

type Entities = MixedList<string | Function | EntitySchema<any>> | undefined

interface TypeOrmDataSourceConfig {
    type: "postgres",
    host: string,
    port: number,
    username: string,
    password: string,
    database: string,
    entities: Entities,
    synchronize: boolean,
}

const readTypeOrmDataSourceConfig = (entities: Entities): TypeOrmDataSourceConfig => {
    readEnvConfig();
    const config: TypeOrmDataSourceConfig = {
        type: "postgres",
        host: process.env.postgress_host!,
        port: Number(process.env.postgress_port!),
        username: process.env.postgress_username!,
        password: process.env.postgress_password!,
        database: process.env.postgress_database!,
        entities: entities,
        synchronize: true,
    };
    return config;
};
const buildDataSource = (config: TypeOrmDataSourceConfig) => new DataSource({...config});

export const getDataSource = (entities: Entities) => buildDataSource(readTypeOrmDataSourceConfig(entities));