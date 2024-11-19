import Navegacion from "../navegacion/Navegacion";
import LisProduct from "./LisProduct";

const Inventario = () => {
    return (
        <div className="flex h-screen pb-8">

            <Navegacion />

            <section className="flex-1 m-4">

                <section>
                    <h1 className="font-extrabold text-2xl">Inventario</h1>
                </section>

                <section className="mt-4 mx-10">
                    <LisProduct />
                </section>

            </section>

        </div>
    )
}

export default Inventario;