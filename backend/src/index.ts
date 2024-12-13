import  express  from "express";
import cors from "cors"
import dotenv from "dotenv"

// rutas
import conectarMongo from "./utils/databases/mongoDB";
import rutasUsuario from "./routes/rutaUsuario.routes";
import rutasMotos from "./routes/rutaMoto.routes"
import rutasAdmin from "./routes/rutaAdmin.routes"
import rutasCliente from './routes/rutaClienteInfo.routes'
 
dotenv.config();
conectarMongo();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 4001;

//servidor
app.listen(PORT,()=>{
    console.log(`conexion exitosa en http://localhost:${PORT}`);
})
//Rutas
app.use('/api/usuario',rutasUsuario);
app.use('/api/moto',rutasMotos);
app.use('/api/admin',rutasAdmin);
app.use('/api/cliente',rutasCliente);