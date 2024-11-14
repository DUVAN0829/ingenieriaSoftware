import { useAuth } from "../context/AuthContext"
import CuadroInfo from "./CuadroInfo"
import Navegacion from "./Navegacion"


export default function Home() {

    const { user, logout } = useAuth()

    const hanldeLogout = async () => {
        await logout() //Revisando la función podemos ver que es de tipo Promise.
    }

    return (

        <div>

            <div className="flex h-screen">
            
                <Navegacion/>

                <div className="flex-1 flex flex-col">

                    <main>
                        <h2 className="text-2xl font-extrabold mt-4 ml-4 text-gray-900">Dashboard</h2>

                        <section className="flex justify-between mx-4 gap-x-8 mt-7">
                            <CuadroInfo titulo={'Total vendido'} valor={1.234} valorDos={'5.7%'} chart={'up'}/>
                            <CuadroInfo titulo={'Ingresos'} valor={'$45.678'} valorDos={'3.2%'} chart={'up'}/>
                        </section>

                        <section className="flex justify-between mx-4 gap-x-8 mt-7">
                            <CuadroInfo titulo={'Stock'} valor={567} valorDos={'2.1%'}/>
                            <CuadroInfo titulo={'Margen de beneficio'} valor={23} valorDos={'1.5%'} chart={'up'}/>
                        </section>

                        {/* <section className="mx-3 mt-4">
                            <button onClick={hanldeLogout} className="bg-blue-950 text-white py-2 px-5 rounded-lg font-bold hover:bg-blue-900 transition-all delay-100">Salir</button>
                        </section> */}

                    </main>

                </div>
            </div>

        </div>
    )
}