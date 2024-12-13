import mongoose,{Schema,Document} from "mongoose";

export interface IMoto extends Document{
    nombres: string;
    apellidos: string;
    telefono:string;
    correo:string;
    password:string;
    imagen?:string;
    creadoAct: Date;
}

const MotoSchema: Schema = new Schema({
    nombre:{
        type:String,
        required: true
        },
    marca:{
        type:String,
        required: true
        },
    modelo:{
        type:String,
        required:true},
    descripcion:{
        type:String, 
        required:true,
    },
    año:{
        type:String,
        required:true,
    },
    cilindraje:{
        type:String,
        required:true
    },
    precio:{
      type:Number,
      required:true
    },
    imagen:{
        type:String,
        required:true
    }
})

export default mongoose.model<IMoto>('Moto',MotoSchema);