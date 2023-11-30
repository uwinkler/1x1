import { z } from 'zod'
import { Middleware, create, RestateStore } from '@restate/core'

//
// Student
//
const studentSchema = z.object({
  id: z.string(),
  name: z.string(),
  imgUrl: z.string()
})
export type Student = z.infer<typeof studentSchema>

//
// Card
//
const cardSchema = z.object({
  id: z.string(),
  student: studentSchema,
  faktorOne: z.number().min(1).max(10),
  faktorTwo: z.number().min(1).max(10),
  level: z.number().min(1)
})
export type Card = z.infer<typeof cardSchema>

//
// Training
//
const trainingSchema = z.object({
  id: z.string(),
  answer: z.number(),
  card: cardSchema,
  timeMs: z.number().min(0)
})
export type Training = z.infer<typeof trainingSchema>

const appStateSchema = z.enum(['loading', 'ready', 'error'])

//
// State
//
const stateSchema = z.object({
  state: appStateSchema,
  currentStudent: studentSchema,
  students: z.array(studentSchema),
  cards: z.array(cardSchema),
  trainings: z.array(trainingSchema),
  baseUrl: z.string()
})
export type State = z.infer<typeof stateSchema>

export type Store = RestateStore<State>

export const NO_STUDENT = 'NO_STUDENT'

const validateMiddlewareWithZod: Middleware<State> = ({ nextState }) =>
  stateSchema.parse(nextState)

const BASE_URL = import.meta.env.DEV
  ? 'http://localhost:8080'
  : 'http://localhost:8080'

export const { useAppState, useSelector, useNext, store } = create<State>({
  state: {
    state: 'loading',
    currentStudent: {
      id: NO_STUDENT,
      name: '',
      imgUrl: ''
    },
    students: [],
    cards: [],
    trainings: [],
    baseUrl: BASE_URL
  },
  middleware: [validateMiddlewareWithZod]
})
