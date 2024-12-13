import { Request, Response } from "express";
import Moto from "../models/mdMoto";

// Crear una nueva moto
export const crearMoto = async (req: Request, res: Response): Promise<void> => {
  try {
    const nuevaMoto = new Moto(req.body);
    const motoGuardada = await nuevaMoto.save();
    res.status(201).json(motoGuardada);
  } catch (error) {
    res.status(400).json({ message: "Error al crear la moto", error });
  }
};

// Obtener todas las motos
export const obtenerMotos = async (req: Request, res: Response): Promise<void> => {
  try {
    const motos = await Moto.find();
    res.status(200).json(motos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las motos", error });
  }
};

// Obtener una moto por ID
export const obtenerMotoPorId = async (req: Request, res: Response): Promise<void> => {
  try {
    const moto = await Moto.findById(req.params.id);
    if (!moto) {
      res.status(404).json({ message: "Moto no encontrada" });
      return;
    }
    res.status(200).json(moto);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la moto", error });
  }
};

// Actualizar una moto
export const actualizarMoto = async (req: Request, res: Response): Promise<void> => {
  try {
    const motoActualizada = await Moto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!motoActualizada) {
      res.status(404).json({ message: "Moto no encontrada" });
      return;
    }
    res.status(200).json(motoActualizada);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar la moto", error });
  }
};

// busacar motos por marca
export const buscarMotosPorMarca = async (req: Request, res: Response): Promise<void> => {
  try {
    const { marca } = req.params;

    console.log(marca)
    
    if (!marca) {
      res.status(400).json({ message: "La marca es obligatoria para realizar la búsqueda." });
      return;
    }
    const motos = await Moto.find({ marca: { $regex: new RegExp(marca as string, "i") } });

    if (!motos || motos.length === 0) {
      res.status(404).json({ message: "No se encontraron motos con la marca especificada." });
      return;
    }

    res.status(200).json(motos);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar motos por marca", error });
  }
};

// Eliminar una moto
export const eliminarMoto = async (req: Request, res: Response): Promise<void> => {
  try {
    const motoEliminada = await Moto.findByIdAndDelete(req.params.id);
    if (!motoEliminada) {
      res.status(404).json({ message: "Moto no encontrada" });
      return;
    }
    res.status(200).json({ message: "Moto eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la moto", error });
  }
};