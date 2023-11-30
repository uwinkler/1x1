import { AppBar } from './AppBar'

import { createHashRouter, RouterProvider } from 'react-router-dom'
import { connectServer } from './connectServer'
import { Fight } from './Fight'
import { store, useSelector } from './store/store'
import { TrainingsPage } from './TrainingsPage'
import { connectTrainingsPageState } from './TrainingsPage.state'
import { TrophyPage } from './TrophyPage'
import { UserSelect } from './UserSelect'

connectServer()
connectTrainingsPageState(store)

const router = createHashRouter([
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
