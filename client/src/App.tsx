import { AppBar } from './AppBar'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { UserSelect } from './UserSelect'
import { connectServer } from './store/connectServer'
import { store } from './store/store'

connectServer(store)

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserSelect />
  }
])

function App() {
  return (
    <>
      <AppBar />
      <RouterProvider router={router} />
    </>
  )
}

export default App
