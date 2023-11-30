import { create } from '@restate/core'
import { Card, Store } from './store/store'
import { distinctUntilChanged, map } from 'rxjs/operators'
import { connectDevTools } from './connectDevTools'

export type TrainingsPageState = {
  card: Card
  possibleAnswers: number[]
  wrongAnswers: number[]
  rightAnswerGiven: boolean
  startTime: number
  endTime: number
}

const DUMMY_CARD: Card = {
  id: 'DUMMY-CARD',
  faktorOne: 0,
  faktorTwo: 0,
  level: 0,
  student: {
    id: '',
    name: '',
    imgUrl: ''
  }
}

const DEFAULT_STATE: TrainingsPageState = {
  card: DUMMY_CARD,
  rightAnswerGiven: false,
  possibleAnswers: [],
  wrongAnswers: [],
  startTime: 0,
  endTime: 0
}

export const {
  useSelector: useTrainingsSelector,
  useNext: useNextTrainingsState,
  useAppState: useTrainingsState,
  store: trainingsStore
} = create<TrainingsPageState>({
  state: DEFAULT_STATE,
  options: {
    storeName: 'trainingsPage'
  }
})

export function connectTrainingsPageState(store: Store) {
  // If the user changes, reset the trainings state
  store.state$
    .pipe(
      map((s) => s.state.currentStudent.id),
      distinctUntilChanged()
    )
    .subscribe(() => {
      trainingsStore.next(DEFAULT_STATE, 'Reset trainings state')
    })
}

connectDevTools(trainingsStore)
