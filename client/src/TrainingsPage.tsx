import { Fireworks, FireworksHandlers } from '@fireworks-js/react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { useSelector } from './store/store'

import Grid from '@mui/material/Grid'
import React from 'react'
import { randomNumbers, shuffle } from './utils'
import successSound from './sounds/answer-ding.mp3'
import failureSound from './sounds/wrong.mp3'
import {
  useNextTrainingsState,
  useTrainingsSelector,
  useTrainingsState
} from './TrainingsPage.state'

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
  const setTrainingState = useNextTrainingsState((s) => s)

  const nextCard = React.useCallback(() => {
    const sortedCards = [...cards].sort((a, b) => a.level - b.level)
    const lowestLevel = sortedCards[0].level
    const lowestLevelCards = sortedCards.filter((c) => c.level === lowestLevel)
    const nextCard = shuffle(lowestLevelCards)[0]
    const result = nextCard.faktorOne * nextCard.faktorTwo
    const possibleAnswers = shuffle([
      result,
      ...randomNumbers().map((n) => n * nextCard.faktorOne)
    ])

    setTrainingState((s) => {
      s.card = nextCard
      s.possibleAnswers = possibleAnswers
      s.wrongAnswers = []
      s.rightAnswerGiven = false
    })
  }, [cards, setTrainingState])

  return nextCard
}

export function TrainingsPage() {
  const nextCard = useNextCard()
  const card = useTrainingsSelector((s) => s.card)
  const possibleAnswers = useTrainingsSelector((s) => s.possibleAnswers)
  const wrongAnswers = useTrainingsSelector((s) => s.wrongAnswers)
  const [rightAnswerGiven, setRightAnswerGiven] = useTrainingsState(
    (s) => s.rightAnswerGiven
  )
  const ref = React.useRef<FireworksHandlers>(null)
  const playSuccessSound = useAudio(successSound)
  const playFailureSound = useAudio(failureSound)
  const nextTrainingState = useNextTrainingsState((s) => s)

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
      if (wrongAnswers.length > 2) {
        startFirework()
      }
      playSuccessSound()
      setTimeout(() => nextCard(), getTimeout())
      setRightAnswerGiven(true)
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
        <Paper elevation={2} sx={{ padding: '10vw' }}>
          <Typography variant="h3">
            {card.faktorOne} x {card.faktorTwo} ={' '}
            {rightAnswerGiven ? card.faktorOne * card.faktorTwo : '?'}
          </Typography>
        </Paper>

        <Grid container gap={2} justifyContent={'center'}>
          {possibleAnswers.map((num) => (
            <Grid item>
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
