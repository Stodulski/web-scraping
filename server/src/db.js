import mongoose from "mongoose";

const URI = process.env.DB;
mongoose
    .connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Conexión establecida con MongoDB");
    })
    .catch((err) => {
        console.error("Error al conectar con MongoDB:", err);
    });
