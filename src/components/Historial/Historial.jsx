import React, { useState, useEffect } from "react";
import axios from "axios";
import Navegacion from "../navegacion/Navegacion";

const Historial = () => {
    const [registros, setRegistros] = useState([]);

    useEffect(() => {
        const obtenerRegistros = async () => {
            try {
                const response = await axios.get("http://localhost:3000/registro");
                const nuevosRegistros = response.data;

                setRegistros((prevRegistros) => {
                    const registrosActualizados = nuevosRegistros.filter(
                        (registroNuevo) =>
                            !prevRegistros.some(
                                (registroExistente) => registroExistente.id === registroNuevo.id
                            )
                    );
                    return [...prevRegistros, ...registrosActualizados];
                });
            } catch (error) {
                console.error("Error al obtener los registros:", error);
            }
        };

        obtenerRegistros();
        const interval = setInterval(obtenerRegistros, 5000);

        return () => clearInterval(interval);
    }, []);

    if (!registros.length) {
        return <div className="text-center text-gray-500">Cargando...</div>;
    }

    return (
        <div className="flex">
            <Navegacion />

            <section className="flex justify-center w-11/12">
                <section className="p-6">
                    <h1 className="text-2xl font-bold mb-4 text-center">Historial de Registros</h1>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border-b">Fecha</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border-b">Hora</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border-b">Motivo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registros.map((registro) => (
                                    <tr key={registro.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-800 border-b">{registro.fecha}</td>
                                        <td className="px-6 py-4 text-sm text-gray-800 border-b">{registro.hora}</td>
                                        <td className="px-6 py-4 text-sm text-gray-800 border-b">{registro.motivo}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </section>
        </div>
    );
};

export default Historial;
