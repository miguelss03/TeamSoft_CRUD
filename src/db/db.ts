import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://miguelprogssilva:s1TScXI3t75MB6Gd@cluster0.qp9puri.mongodb.net/?retryWrites=true&w=majority"
        );
        console.log('MongoDB Conectado com sucesso!');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};