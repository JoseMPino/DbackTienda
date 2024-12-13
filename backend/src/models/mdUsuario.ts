import mongoose,{Schema,Document} from "mongoose";

export interface IUsuario extends Document{
    nombres: string;
    apellidos: string;
    telefono:string;
    correo:string;
    password:string;
    creadoAct: Date;
}

const UsuarioSchema: Schema = new Schema({
    nombres:{
        type:String,
        required: true
        },
    apellidos:{
        type:String,
        required: true
        },
    telefono:{
        type:String,
        required:true},
    correo:{
        type:String, 
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    creadoAct:{
        type: Date,
        default: Date.now 
    },
})

export default mongoose.model<IUsuario>('Usuario',UsuarioSchema);