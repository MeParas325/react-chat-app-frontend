import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Join from "./components/Join/Join.jsx"
import Chat from "./components/Chat/Chat.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/chat",
    element: <Chat />
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
