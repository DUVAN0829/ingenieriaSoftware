
import CuadroInfo from "./CuadroInfo"
import Navegacion from "../navegacion/Navegacion"
import UpVentas from "../Graficos/UpVentas"
import LowerVentas from "../Graficos/LowerVentas"
import IncomeVentas from "../Graficos/IncomeVentas"
import TrendVentas from "../Graficos/TrendVentas"

export default function Home() {

    return (
        <div>
            <div className="flex h-screen">
                <Navegacion />

                {/* Agregamos margin-left y margin-top para dar espacio a la barra fija */}
                <div className="flex-1 flex flex-col ml-64 mt-0">

                    <main>
                        <h1 className="text-2xl font-extrabold mt-4 ml-4 text-gray-900">Dashboard</h1>

                        {/* Banners de información general */}
                        <section className="flex justify-between mx-4 gap-x-8 mt-7">
                            <CuadroInfo titulo={'Total vendido'} valor={"1.500"} valorDos={'50%'} chart={'up'} />
                            <CuadroInfo titulo={'Ingresos'} valor={'$56.000'} valorDos={'3.2%'} chart={'up'} />
                        </section>

                        <section className="flex justify-between mx-4 gap-x-8 mt-7">
                            <CuadroInfo titulo={'Stock'} valor={"1.518"} valorDos={'2.1%'} />
                            <CuadroInfo titulo={'Margen de beneficio'} valor={55} valorDos={'1.5%'} chart={'up'} />
                        </section>

                        {/* Graficos */}
                        <section className="flex justify-between gap-x-8 mt-7 mx-4">
                            <section className="w-2/4">
                                <UpVentas />
                            </section>

                            <section className="w-2/4">
                                <LowerVentas />
                            </section>

                        </section>

                        <section className="flex justify-between gap-x-8 mt-7 mx-4 mb-9">
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
