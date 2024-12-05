import Navegacion from "../navegacion/Navegacion";
import LisProduct from "./LisProduct";

const Inventario = () => {
    return (
        <div className="flex h-screen pb-8">

            <Navegacion />

            {/* Agregamos margin-left para evitar que el contenido se sobreponga */}
            <section className="flex-1 m-4 ml-64">
                
                <section className="mt-4 mx-10">
                    <LisProduct />
                </section>

            </section>

        </div>
    )
}

export default Inventario;
