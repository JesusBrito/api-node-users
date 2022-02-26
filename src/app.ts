import bodyParser from "body-parser";
import express from "express";

//RUTAS
import userRoutes from "./routes/users"

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// configuración de cabeceras
app.use((req,res,next)=>{
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Controll-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
	next();
});

//rutas base
app.use('/api', userRoutes);

export default app;
