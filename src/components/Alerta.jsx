import React from 'react'

const Alerta = ({children}) => {
  return (
    <div className='text-red-700 uppercase'>
        {children}
    </div>
  )
}

export default Alerta
