import { useAuth } from "../../context/AuthContext"
import CuadroInfo from "./CuadroInfo"
import Navegacion from "../navegacion/Navegacion"
import UpVentas from "../Graficos/UpVentas"
import LowerVentas from "../Graficos/LowerVentas"
import IncomeVentas from "../Graficos/IncomeVentas"
import TrendVentas from "../Graficos/TrendVentas"


export default function Home() {

    const { user, logout } = useAuth()

    const hanldeLogout = async () => {
        await logout() //Revisando la función podemos ver que es de tipo Promise.
    }

    return (

        <div>

            <div className="flex h-screen">

                <Navegacion />

                <div className="flex-1 flex flex-col">

                    <main>
                        <h1 className="text-2xl font-extrabold mt-4 ml-4 text-gray-900">Dashboard</h1>

                        {/* //todo: Banners de información general. */}
                        <section className="flex justify-between mx-4 gap-x-8 mt-7">
                            <CuadroInfo titulo={'Total vendido'} valor={"1.400"} valorDos={'50%'} chart={'up'} />
                            <CuadroInfo titulo={'Ingresos'} valor={'$52.000'} valorDos={'3.2%'} chart={'up'} />
                        </section>

                        <section className="flex justify-between mx-4 gap-x-8 mt-7">
                            <CuadroInfo titulo={'Stock'} valor={1518} valorDos={'2.1%'} />
                            <CuadroInfo titulo={'Margen de beneficio'} valor={23} valorDos={'1.5%'} chart={'up'} />
                        </section>

                        {/* <section className="mx-3 mt-4">
                            <button onClick={hanldeLogout} className="bg-blue-950 text-white py-2 px-5 rounded-lg font-bold hover:bg-blue-900 transition-all delay-100">Salir</button>
                        </section>  */}

                        {/* //todo: Graficos. */}
                        <section className="flex justify-between gap-x-8 mt-7 mx-4">
                            <section className="w-2/4">
                                <UpVentas />
                            </section>

                            <section className="w-2/4">
                                <LowerVentas />
                            </section>
                            
                        </section>

                        <section className="flex justify-between gap-x-8 mt-7 mx-4">
                            <section className="w-2/4">
                                <IncomeVentas />
                            </section>

                            <section className="w-2/4">
                                <TrendVentas />
                            </section>
                            
                        </section>

                    </main>

                </div>
            </div>

        </div>
    )
}