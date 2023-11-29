import { AppBar } from './AppBar'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { UserSelect } from './UserSelect'
import { connectServer } from './store/connectServer'
import { store, useSelector } from './store/store'
import { TrainingsPage } from './TrainingsPage'
import { connectTrainingsPageState } from './TrainingsPage.state'
import { Fight } from './Fight'
import { TrophyPage } from './store/TrophyPage'

connectServer(store)
connectTrainingsPageState(store)

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <AppBar />
        <UserSelect />
      </>
    )
  },
  {
    path: '/training',
    element: (
      <>
        <AppBar />
        <TrainingsPage />
      </>
    )
  },
  {
    path: '/wettkampf',
    element: (
      <>
        <AppBar />
        <Fight />
      </>
    )
  },
  {
    path: '/erfolge',
    element: (
      <>
        <AppBar />
        <TrophyPage />
      </>
    )
  }
])

function Loading() {
  return <div>Loading...</div>
}

function ErrorPage() {
  return <div>Loading...</div>
}

function App() {
  const appState = useSelector((s) => s.state)

  if (appState === 'loading') {
    return <Loading />
  }

  if (appState === 'error') {
    return <ErrorPage />
  }

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
