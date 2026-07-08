import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passwordroutes from './routes/passwordRoutes.js'

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json());
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//   }),
// );
app.use('/api/password',passwordroutes)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});