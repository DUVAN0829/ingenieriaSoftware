import { TrendingUp, TrendingDown } from "lucide-react"

const CuadroInfo = (prop) => {

    const { titulo, valor, valorDos, chart } = prop

    return (
        <div className="w-2/4 h-90 rounded-lg shadow-xl">
            <section className="mt-5 ml-7 my-4">

                <h2 className="font-semibold text-xl text-gray-900">{titulo}</h2>

                <p className="font-extrabold text-2xl">{valor}</p>

                <section className="flex gap-x-1 text-sm font-semibold">
                    {chart === 'up' ? <TrendingUp className="stroke-green-600" /> : <TrendingDown className="stroke-red-600" />}

                    {chart === 'up' ? <p className="text-green-600">{valorDos}</p> : <p className="text-red-600">{valorDos}</p>}
                    
                </section>

            </section>
        </div>
    )
}

export default CuadroInfo