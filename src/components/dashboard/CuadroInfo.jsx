import { TrendingUp, TrendingDown } from "lucide-react"

const CuadroInfo = (prop) => {

    const { titulo, valor, valorDos, chart } = prop

    return (
        <div className="w-2/4 h-90 rounded-lg shadow-md bg-slate-50">
            <section className="mt-5 ml-7 my-4 flex justify-between pr-11">

                <section>
                    <h2 className="font-semibold text-xl text-gray-900">{titulo}</h2>

                    <p className="font-extrabold text-2xl">{valor}</p>
                </section>

                <section className={`flex gap-x-1 text-sm font-semibold h-8 px-2 rounded-tremor-small border-2 items-center ${chart === 'up' ?'bg-emerald-100 border-emerald-200':'bg-red-100 border-red-200'}`}>

                    {chart === 'up' ? <TrendingUp className="text-emerald-600" /> : <TrendingDown className="text-red-600" />}

                    <p className={`${chart === 'up' ? 'text-emerald-600' : 'text-red-600'} font-extrabold text-ms `}>{valorDos}</p>

                </section>

            </section>
        </div>
    )
}

export default CuadroInfo