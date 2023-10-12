import express from "express"
import dotenv from "dotenv"
import db from "./config/db.js"
import usuariosRoutes from "./routes/usuario.routes.js"
import productosRoutes from "./routes/productos.routes.js"
import blogsRoutes from "./routes/blogs.routes.js"
import pedidosRoutes from "./routes/pedidos.routes.js"
import cors from "cors"

const app = express()
dotenv.config()
app.use(cors())

app.use(express.static("src/uploads"))

//------------------------CONECCION BASE DE DATOS ------------------------//
db.authenticate()
    .then(() => console.log("base de datos conectada"))
    .catch(error => console.log(error))
//------------------------------------------------------------------------//

app.use(express.json())
app.use("/api/usuarios", usuariosRoutes)
app.use("/api/productos", productosRoutes)
app.use("/api/blogs", blogsRoutes)
app.use("/api/pedidos", pedidosRoutes)


app.listen(4000, () => {
    console.log(`Servidor corriendo en el puerto ${4000}`);
})

