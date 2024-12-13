import { Router } from "express";
import {
  crearMoto,obtenerMotos,obtenerMotoPorId,actualizarMoto,eliminarMoto,buscarMotosPorMarca} from "../controllers/ctrlMoto";

const router = Router();

router.post("/", crearMoto); 
router.get("/", obtenerMotos); 
router.get("/:id", obtenerMotoPorId); 
router.put("/:id", actualizarMoto); 
router.delete("/:id", eliminarMoto);
router.get("/busca/:marca",buscarMotosPorMarca)
export default router;