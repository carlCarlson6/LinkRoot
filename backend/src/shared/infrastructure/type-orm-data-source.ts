import { DataSource } from "typeorm"
import { RootEntity } from "../../roots/infrastructure/root-entity";

const dataSource = new DataSource({
    type: "postgres",
    host: "db.oixfmrsppzqqaqkdmogw.supabase.co",
    port: 6543,
    username: "postgres",
    password: "[POSTGRESS-DB]",
    database: "postgres",
    entities: [RootEntity],
    synchronize: true,
});

export default dataSource;