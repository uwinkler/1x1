import axios from 'axios'
import { distinctUntilChanged, filter, map } from 'rxjs/operators'
import { Card, NO_STUDENT, Training, store } from './store/store'

export async function connectServer() {
  axios.defaults.baseURL = store.state.baseUrl
  connectLogger()
  await connectLoadStudents()
  connectLoadUserData()
}

function connectLogger() {
  store.state$.subscribe((update) => {
    console.log((update.trace || 'UPDATE') + ':', update.state)
  })
}

async function connectLoadStudents() {
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

function connectLoadUserData() {
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

// function connectUpdateCard() {
//   onMessage('UpdateCard').subscribe(async (cardId) => {
//     try {
//       const card = store.state.cards.find((c) => c.id === cardId)
//       await axios.put<Card>(`/api/cards/${cardId}`, card)
//     } catch (error) {
//       console.log(error)
//     }
//   })
// }

// function connectPostTraining() {
//   onMessage('PostTraining').subscribe(async (id) => {
//     try {
//       const training = store.state.trainings.find((t) => t.id === id)
//       await axios.post(`/api/trainings`, training)
//     } catch (error) {
//       console.log(error)
//     }
//   })
// }
