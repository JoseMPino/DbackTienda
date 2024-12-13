import mongoose,{Schema,Document} from "mongoose";

export interface IClienteInfo extends Document{
    correo:string;
    nombres:string;
    apellidos:string;
    telefono:string;
    moto:string;
}

const AdminSchema: Schema = new Schema({
    correo:{
        type:String,
        required:true
    },
    nombres:{
        type:String,
        required:true
    },
    apellidos:{
        type:String,
        required:true
    },
    telefono:{
        type:String,
        required:true
    },
    moto:{
        type:String,
        require:true
    }
})

export default mongoose.model<IClienteInfo>('ClienteInfo',AdminSchema);