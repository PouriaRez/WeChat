// PGHOST='ep-bold-cherry-a5hslwdj-pooler.us-east-2.aws.neon.tech'
// PGDATABASE='neondb'
// PGUSER='neondb_owner'
// PGPASSWORD='npg_fMPD3q2NuEkB'
// PGPORT=5432
import dotenv from "dotenv";
dotenv.config();
export const host = process.env.PGHOST;
