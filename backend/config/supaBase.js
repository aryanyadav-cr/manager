import {createClient} from "@supabase/supabase-js"
import dotenv from "dotenv";
dotenv.config();
const supaBase = createClient(
    process.env.SUPABASE_UPL,
    process.env.SUPABASE_KEY,
)
export default supaBase