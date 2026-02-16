import React from 'react'
import Todo from './Todo'
import { Bounce, Flip, Slide, ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Todo />
      <ToastContainer
          stacked
          transition={Slide}
          position="top-right"
          autoClose={900}
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
