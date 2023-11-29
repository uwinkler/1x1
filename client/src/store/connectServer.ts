import axios from 'axios'
import { distinctUntilChanged, filter, map } from 'rxjs/operators'
import { Card, NO_STUDENT, Store, Training } from './store'

export async function connectServer(store: Store) {
  axios.defaults.baseURL = store.state.baseUrl
  connectLogger(store)
  await connectLoadStudents(store)
  connectLoadUserData(store)
}

function connectLogger(store: Store) {
  store.state$.subscribe((update) => {
    console.log((update.trace || 'UPDATE') + ':', update.state)
  })
}

async function connectLoadStudents(store: Store) {
  try {
    const res = await axios.get('/api/students')
    const students = res.data
    store.next((state) => {
      state.students = students
      state.currentStudent = students[0]
    })
  } catch (error) {
    console.log(error)
    store.next((s) => {
      s.state = 'error'
    })
  }
}

function connectLoadUserData(store: Store) {
  store.state$
    .pipe(
      map((update) => update.state),
      filter((state) => state.currentStudent.id !== NO_STUDENT),
      distinctUntilChanged(
        (prev, next) => prev.currentStudent.id === next.currentStudent.id
      )
    )
    .subscribe(async (update) => {
      try {
        const studentId = update.currentStudent.id
        const cards = await fetchCards(studentId)
        const trainings = await fetchTrainings(studentId)
        store.next((s) => ({
          ...s,
          state: 'ready',
          cards,
          trainings
        }))
      } catch (error) {
        console.log(error)
        store.next((state) => {
          state.state = 'error'
        })
      }
    })

  async function fetchCards(studentId: string) {
    const res = await axios.get<Card[]>(`/api/students/${studentId}/cards`)
    const cards = res.data
    return cards
  }

  async function fetchTrainings(studentId: string) {
    const res = await axios.get<Training[]>(
      `/api/students/${studentId}/trainings`
    )
    const trainings = res.data
    return trainings
  }
}
