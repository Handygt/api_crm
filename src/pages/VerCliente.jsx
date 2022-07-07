import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Spinner from "../components/Spinner"

const VerCliente = () => {

    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(true)

    const {id} = useParams()

    useEffect( () => {
        
        const obtenerCliente = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`;
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();

                setCliente(resultado)

            } catch (error) {
                console.log(error)
            }
            setCargando(!cargando)
        }

        obtenerCliente();

    }, [])
    
  return (

    cargando ? <Spinner /> : 
                Object.keys(cliente).length === 0 ? 
                <p className="text-4xl text-gray-700 mt-10">No hay Resultados</p> : (
                    <div>
                        <>
                            <h1 className='font-black text-3xl text-blue-900'>Vista Cliente: {cliente.nombre}</h1>
                            <p>Informacion del Cliente.</p>
                    
                            <p className="text-4xl text-gray-700 mt-10"> 
                                <span className="uppercase font-bold"
                                >   Cliente: </span>
                                {cliente.nombre}
                            </p>
                            <p className="text-2xl text-gray-700 mt-2"> 
                                <span className="uppercase font-bold"
                                >   Empresa: </span>
                                {cliente.empresa}
                            </p>
                            <p className="text-2xl text-gray-700 mt-2"> 
                                <span className="uppercase font-bold"
                                >   Email: </span>
                                {cliente.email}
                            </p>
                            <p className="text-2xl text-gray-700 mt-2"> 
                                <span className="uppercase font-bold"
                                >   Telefono: </span>
                                {cliente.telefono}
                            </p>
                            { cliente.notas && (
                                <p className="text-2xl text-gray-700 mt-2"> 
                                    <span className="uppercase font-bold"
                                    >   Notas: </span>
                                    {cliente.notas}
                                </p>
                            )}
                        </>                                
                    </div>
                )   
        
  )
}

export default VerCliente
