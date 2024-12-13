import { Router } from "express";
import { crearUsuario,obtenerUsuarios,autenticarUsuario,obtenerUsuarioPorCorreo } from "../controllers/ctrlUsuario";
const router = Router();

router.get('/',obtenerUsuarios);
router.get('/:email',obtenerUsuarioPorCorreo)
router.post('/',crearUsuario);
router.post('/login',autenticarUsuario);

export default router;