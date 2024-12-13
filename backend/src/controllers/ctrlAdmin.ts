import { Request, Response } from "express";
import Admin from '../models/mdAdmin';
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRETO = "Jose2005"
export const crearAdmin =async (req:Request,res:Response):Promise<void>=>{
    try {
        const { username, password } = req.body;
        const ocultaPassword = await bcryptjs.hash(password, 10);

       const nuevoAdmin = await new Admin({username,password:ocultaPassword});
       nuevoAdmin.save();
       res.status(201).json(nuevoAdmin)
    } catch (error) {
    res.status(400).json({ message: "Error al crear el administrador", error });
    }


}

export const obtenerAdmins = async (req: Request, res: Response): Promise<void> => {
    try {
      const admins = await Admin.find();
      res.status(200).json(admins);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los administradores", error });
    }
  };

export const autenticarAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password } = req.body;

      // Buscar el admin por correo para ver si existe
      const admin = await Admin.findOne({ username });
      if (!admin) {
        res.status(400).json({ message: "Username o contraseña incorrectos" });
        return;
      }
  
      // Verificar la contraseña
      const esPasswordValido = await bcryptjs.compare(password, admin.password);
      if (!esPasswordValido) {
        res.status(400).json({ message: "Username o contraseña incorrectos" });
        return;
      }
  
      // Generar un token
      const token = jwt.sign({ id: admin._id, username: admin.username}, JWT_SECRETO, {
        expiresIn: "1h",
      });
  
      res.status(200).json({ token, message: "Autenticación exitosa" });
    } catch (error) {
      res.status(500).json({ message: "Error al autenticar el usuario", error });
    }
  };

