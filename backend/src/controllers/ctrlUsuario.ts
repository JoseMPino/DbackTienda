import { Request, Response } from "express";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import Usuario from "../models/mdUsuario";


const JWT_SECRETO = "Jose2005"



// Crear un usuario
export const crearUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
    const { nombres, apellidos, telefono, correo, password } = req.body;

    // Validar si ya existe un usuario
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
        res.status(400).json({ message: "El correo ya está registrado." });
        return;
    }
    const ocultaPassword = await bcryptjs.hash(password, 10);

    // Crear el usuario
    const nuevoUsuario = new Usuario({ nombres, apellidos, telefono, correo, password:ocultaPassword });
    await nuevoUsuario.save();

    res.status(201).json({ message: "Usuario creado exitosamente", usuario: nuevoUsuario });
    } catch (error) {
    res.status(500).json({ message: "Error al crear el usuario", error });
    }
};

// Obtener todos los usuarios
export const obtenerUsuarios = async (req: Request, res: Response): Promise<void> => {
    try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
    } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error });
    }
};

//autenticar Usuario
export const autenticarUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
      const { correo, password } = req.body;
  
      // Buscar el usuario por correo para ver si existe
      const usuario = await Usuario.findOne({ correo });
      if (!usuario) {
        res.status(400).json({ message: "Correo o contraseña incorrectos" });
        return;
      }
  
      // Verificar la contraseña
      const esPasswordValido = await bcryptjs.compare(password, usuario.password);
      if (!esPasswordValido) {
        res.status(400).json({ message: "Correo o contraseña incorrectos" });
        return;
      }
  
      // Generar un token
      const token = jwt.sign({ id: usuario._id, correo: usuario.correo }, JWT_SECRETO, {
        expiresIn: "1h",
      });
  
      res.status(200).json({ token, message: "Inicio de sesión exitoso" });
    } catch (error) {
      res.status(500).json({ message: "Error al iniciar sesión", error });
    }
  };

  //obtener usuario por correo:
  export const obtenerUsuarioPorCorreo = async (req: Request, res: Response): Promise<void> => {
    try {
        const correo = req.params.email
    
        if (!correo) {
            res.status(400).json({ message: "El correo es obligatorio" });
            return;
        }
        const usuario = await Usuario.findOne({ correo: correo });
      

        if (!usuario) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el usuario", error });
    }
};