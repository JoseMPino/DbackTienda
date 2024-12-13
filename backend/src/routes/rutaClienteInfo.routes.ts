import { Router } from "express";
import {crearCliente,eliminarCliente,obtenerClientes} from '../controllers/ctrlClienteInfo';
const router = Router();

router.get('/',obtenerClientes);
router.post('/',crearCliente);
router.delete('/:id',eliminarCliente)

export default router;