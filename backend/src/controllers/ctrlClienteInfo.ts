import { Request, Response } from "express";
import ClienteInfo from '../models/mdClienteInfo'

export const crearCliente = async(req: Request, res: Response): Promise<void> => {
    try {
        const { correo, nombres, apellidos, telefono, moto } = req.body;
       


        if (!correo || !nombres || !apellidos || !telefono || !moto) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }

        const nuevoCliente = new ClienteInfo({
            correo,
            nombres,
            apellidos,
            telefono,
            moto
        });

        const clienteGuardado = await nuevoCliente.save();
        res.status(201).json({ message: 'Registro Exitoso', data: clienteGuardado });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el cliente',  error: (error as Error).message });
    }
}

export const  obtenerClientes= async(req: Request, res: Response): Promise<void> => {
    try {
        const clientes = await ClienteInfo.find();
        res.status(200).json({ message: 'Clientes obtenidos exitosamente', data: clientes });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los clientes', error: (error as Error).message });
    }
}
export const eliminarCliente= async(req: Request, res: Response): Promise<void> =>{
    try {
        const { id } = req.params;

        // Validar que el ID está presente
        if (!id) {
            res.status(400).json({ message: 'El ID del cliente es obligatorio' });
            return;
        }

        const clienteEliminado = await ClienteInfo.findByIdAndDelete(id);

        if (!clienteEliminado) {
            res.status(404).json({ message: 'Cliente no encontrado' });
            return;
        }

        res.status(200).json({ message: 'Cliente eliminado exitosamente', data: clienteEliminado });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el cliente', error: (error as Error).message });
    }
}
