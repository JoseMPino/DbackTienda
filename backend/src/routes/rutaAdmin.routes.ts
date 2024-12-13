import { Router } from "express";
import {crearAdmin,obtenerAdmins,autenticarAdmin} from "../controllers/ctrlAdmin";

const router = Router();

router.get('/',obtenerAdmins);
router.post('/',crearAdmin);
router.post('/login',autenticarAdmin)

export default router;