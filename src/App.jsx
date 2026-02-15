import React from 'react'
import Todo from './Todo'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Todo />
      <ToastContainer
          position="top-right"
          autoClose={6000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOffHover
          theme="colored"
          // transition={Bounce}
      />
    </>
  )
}

export default App
