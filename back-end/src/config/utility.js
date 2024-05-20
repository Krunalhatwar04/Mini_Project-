import { createConnection } from "mysql";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from "../constrain/dbconstrain.js";

export const conn=createConnection(
    {host:DB_HOST,user:DB_USER,password:DB_PASSWORD,database:DB_NAME}
);
    