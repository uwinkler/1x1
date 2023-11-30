import { Fireworks, FireworksHandlers } from '@fireworks-js/react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { Training, useNext, useSelector } from './store/store'

import Grid from '@mui/material/Grid'
import React from 'react'
import {
  useNextTrainingsState,
  useTrainingsSelector,
  useTrainingsState
} from './TrainingsPage.state'
import successSound from './sounds/answer-ding.mp3'
import failureSound from './sounds/wrong.mp3'
import { randomNumbers, shuffle } from './utils'
import axios from 'axios'

function useAudio(url: string) {
  const [audio] = React.useState(new Audio(url))

  function play() {
    audio.pause()
    audio.currentTime = 0
    audio.play()
  }

  return play
}

function useNextCard() {
  const cards = useSelector((s) => s.cards)
  const setTrainingState = useNextTrainingsState((s) => s, 'useNextCard')

  const nextCard = React.useCallback(() => {
    const sortedCards = [...cards].sort((a, b) => a.level - b.level)
    const lowestLevel = sortedCards[0].level
    const lowestLevelCards = sortedCards.filter((c) => c.level === lowestLevel)
    const nextCard = shuffle(lowestLevelCards)[0]
    const result = nextCard.faktorOne * nextCard.faktorTwo
    const numberOfPossibleAnswers = Math.min(10, nextCard.level + 2)
    const possibleAnswers = shuffle(
      randomNumbers({
        factor: nextCard.faktorOne,
        startWith: [result],
        length: numberOfPossibleAnswers
      })
    )

    setTrainingState((s) => {
      s.card = nextCard
      s.possibleAnswers = possibleAnswers
      s.wrongAnswers = []
      s.rightAnswerGiven = false
      s.startTime = Date.now()
    })
  }, [cards, setTrainingState])

  return nextCard
}

function useUpdateCard() {
  const decrease = useTrainingsSelector((s) => s.wrongAnswers.length > 0)
  const cardId = useTrainingsSelector((s) => s.card.id)
  const startTime = useTrainingsSelector((s) => s.startTime)
  const setAppState = useNext((s) => s)

  return React.useCallback(() => {
    setAppState((s) => {
      const card = s.cards.find((c) => c.id === cardId)

      if (!card) {
        return
      }

      card.level = decrease
        ? Math.max(1, card.level - 1)
        : Math.min(10, card.level + 1)

      const training: Training = {
        id: crypto.randomUUID(),
        answer: 0,
        card,
        timeMs: Date.now() - startTime
      }

      s.trainings.push(training)

      try {
        axios.put(`/api/cards/${cardId}`, card)
        axios.post(`/api/trainings`, training)
      } catch (e) {
        console.error(e)
      }
    })
  }, [decrease, cardId, setAppState, startTime])
}

export function TrainingsPage() {
  const nextCard = useNextCard()
  const card = useTrainingsSelector((s) => s.card)
  const possibleAnswers = useTrainingsSelector((s) => s.possibleAnswers)
  const wrongAnswers = useTrainingsSelector((s) => s.wrongAnswers)
  const [rightAnswerGiven, setRightAnswerGiven] = useTrainingsState(
    (s) => s.rightAnswerGiven,
    { trace: 'setRightAnswerGiven' }
  )
  const ref = React.useRef<FireworksHandlers>(null)
  const playSuccessSound = useAudio(successSound)
  const playFailureSound = useAudio(failureSound)
  const nextTrainingState = useNextTrainingsState((s) => s)
  const updateCard = useUpdateCard()

  if (card.id == 'DUMMY-CARD') {
    nextCard()
  }

  function getTimeout() {
    return 1000 + wrongAnswers.length * 2000
  }

  const startFirework = () => {
    if (!ref.current) return
    if (ref.current.isRunning) {
      ref.current.stop()
    }
    ref.current.start()
    setTimeout(() => ref.current?.stop(), getTimeout())
  }

  function handleClick(answer: number) {
    if (answer === card.faktorOne * card.faktorTwo) {
      if (wrongAnswers.length > 0) {
        startFirework()
      }
      playSuccessSound()
      setRightAnswerGiven(true)
      updateCard()
      setTimeout(() => nextCard(), getTimeout())
    } else {
      nextTrainingState((s) => {
        s.wrongAnswers.push(answer)
      })
      playFailureSound()
    }
  }

  return (
    <>
      <Box sx={{ flex: 1, display: 'grid', placeItems: 'center' }}>
        <Paper elevation={2} sx={{ padding: '10vw', width: '500px' }}>
          <Typography variant="h3">
            {card.faktorOne} x {card.faktorTwo} ={' '}
            {rightAnswerGiven ? card.faktorOne * card.faktorTwo : '?'}
          </Typography>
        </Paper>

        <Grid container gap={2} justifyContent={'center'}>
          {possibleAnswers.map((num) => (
            <Grid key={num} item>
              <AnswerButton
                isWrong={wrongAnswers.includes(num)}
                key={num}
                answer={num}
                onClick={() => handleClick(num)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Fireworks
        ref={ref}
        autostart={false}
        options={{
          opacity: 0.5
        }}
        style={{
          pointerEvents: 'none',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          position: 'fixed',
          background: 'transparent'
        }}
      />
    </>
  )
}

function AnswerButton({
  answer,
  isWrong,
  onClick
}: {
  answer: number
  isWrong: boolean
  onClick: React.MouseEventHandler<HTMLDivElement>
}) {
  return (
    <Button
      onClick={onClick}
      disabled={isWrong}
      component={Paper}
      sx={{
        backgroundColor: isWrong ? 'white' : 'grey.100',
        width: '40px',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Typography variant="h6">{isWrong ? 'X' : answer}</Typography>
    </Button>
  )
}
