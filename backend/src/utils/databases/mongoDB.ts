import mongoose from "mongoose";

const URL_MONGODB ='mongodb+srv://j2005mpv:9Law78KOpfaPur6n@clusterpino.qyoi8.mongodb.net/sistemaVentas?retryWrites=true&w=majority&appName=ClusterPino'
const conectarMongo = async (): Promise<void> =>{

    try {
        await mongoose.connect(URL_MONGODB || "");
        console.log("MongoDB conectado con exito!");
    } catch (error) {
        console.error("error: ", error);
        process.exit(1);
    }
};

export default conectarMongo;
