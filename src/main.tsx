import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RegisterEvento from './components/RegisterEvento';
import Home from './components/Home';
import EventosRealizados from './components/TableEventos';




const router = createBrowserRouter([

  {
    path: "/addevento",
    element: <RegisterEvento/>
  },
  {
    path: "/vieweventos",
    element: <EventosRealizados />
  },

  {
    path: "/",
    element: <Home/>
  }
])
  


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <RouterProvider router={router}/>
  </React.StrictMode>
);
