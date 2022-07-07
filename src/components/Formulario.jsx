import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'

const Formulario = ({cliente, cargando}) => {

    // Función para redirigir a otra pagina.
    const navigate = useNavigate();

    // Manejador de Validaciones del Formulario.
    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                    .min(3, 'El nombre es muy corto')
                    .max(20, 'El nombre es muy largo')
                    .required('** El nombre es obligatorio'),
        empresa: Yup.string()
                    .required('El nombre de la empresa es obligarotio'),
        email: Yup.string()
                    .required('El E-mail es obligatorio')
                    .email('Email no válido'),
        telefono: Yup.number()
                    .typeError('El télefono no es válido')
                    .integer('El télefono no es válido')
                    .positive('El télefono no es válido')

    })

    // Función que envia los datos a la base de datos.
    const handleSubmit = async (valores) =>{
        try {

            let respuesta
            if(cliente.id){
                //EDITAR REGISTRO
                const url = ` http://localhost:4000/clientes/${cliente.id}`

                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                
            }else{
                //NUEVO REGISTRO
                const url =  'http://localhost:4000/clientes'

                respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })                
                
            }

            // const resultado = await respuesta.json();
            await respuesta.json();
                
            //Redirección
            navigate('/clientes')
            

        } catch (error) {
            console.log(error)
        }
    }

  return (
    cargando ? <Spinner /> : (
        <div className='bg-white mt-10 px-5 py-10 rounded shadow-md md:w-3/4 mx-auto'>
            <h1 className='text-gray font-bold text-xl text-center'>{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>

            <Formik 

                //Values para cada campo del formulario
                initialValues={{
                    nombre: cliente?.nombre ?? '',
                    empresa: cliente?.empresa ??'',
                    email: cliente?.email ??'',
                    telefono: cliente?.telefono ??'',
                    notas: cliente?.notas ??'',
                }}
                //para llenar el formulario se necesita esta funcion
                enableReinitialize={true}
                //Llamar a la función para ingresar los datos
                onSubmit = { async (values, {resetForm}) => {
                    await handleSubmit(values);
                    //Reseterar el formulario, necesita un import.
                    resetForm();
                }}
                //Validador de datos
                validationSchema={nuevoClienteSchema}

            >
                {({errors, touched}) => {                
                    return (
                <Form className='mt-10'>
                    <div className='mb-4'>
                        <label 
                            className="text-gray-800"
                            htmlFor="nombre"
                            >
                            Nombre: </label>
                        <Field
                            id="nombre" 
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50 shadow-md"
                            placeholder="Nombre del Cliente"
                            name="nombre"
                        />  
                        {/* Mensaje de Error */}
                        { errors.nombre && touched.nombre ? (
                            <Alerta>{errors.nombre}</Alerta>
                        ): null }                  
                    </div>
                    <div className='mb-4'>
                        <label 
                            className="text-gray-800"
                            htmlFor="empresa"
                            >
                            Empresa: </label>
                        <Field
                            id="empresa" 
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50 shadow-md"
                            placeholder="Nombre de la Empresa"
                            name="empresa"
                        />
                        { errors.empresa && touched.empresa ? (
                            <Alerta>{errors.empresa}</Alerta>
                        ): null } 
                    </div>
                    <div className='mb-4'>
                        <label 
                            className="text-gray-800"
                            htmlFor="email"
                            >
                            E-mail: </label>
                        <Field
                            id="email" 
                            type="email"
                            className="mt-2 block w-full p-3 bg-gray-50 shadow-md"
                            placeholder="E-mail"
                            name="email"
                        />
                        { errors.email && touched.email ? (
                            <Alerta>{errors.email}</Alerta>
                        ): null }
                    </div>
                    <div className='mb-4'>
                        <label 
                            className="text-gray-800"
                            htmlFor="telefono"
                            >
                            Teléfono: </label>
                        <Field
                            id="empresa" 
                            type="tel"
                            className="mt-2 block w-full p-3 bg-gray-50 shadow-md"
                            placeholder="Teléfono"
                            name="telefono"
                        />
                        { errors.telefono && touched.telefono ? (
                            <Alerta>{errors.telefono}</Alerta>
                        ): null }
                    </div>  
                    <div className='mb-4'>
                        <label 
                            className="text-gray-800"
                            htmlFor="notas"
                            >
                            Notas: </label>
                        <Field
                            as="textarea"
                            id="notas" 
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50 shadow-md h-40"
                            placeholder="Notas"
                            name="notas"
                        />
                    </div>
                    <input type="submit" value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'} className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg hover:bg-blue-700 rounded-md' />              
                </Form>
                )}}

            </Formik>
        </div>
    )
  )
}

Formulario.defaultProps = {

    cliente: {},
    cargando: false
    
}

export default Formulario
