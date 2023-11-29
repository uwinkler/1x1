import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton' // Add missing import
import Typography from '@mui/material/Typography'
import { Student, useNext, useSelector } from './store/store'
import Paper from '@mui/material/Paper'

function UserButton({ student }: { student: Student }) {
  const setCurrentUser = useNext((s) => s.currentStudent)
  const isCurrent = useSelector((s) => s.currentStudent?.id === student.id)

  const size = isCurrent ? `min(30vw,400px)` : `min(15vw,200px)`
  return (
    <Box
      sx={{
        height: `min(30vw,400px)`,
        width: `min(30vw,400px)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        spacing: 2
      }}
    >
      <IconButton onClick={() => setCurrentUser(student)}>
        <Avatar
          component={Paper}
          elevation={8}
          sx={{
            width: size,
            height: size,
            transition: 'width 0.5s ease-in-out, height 0.7s ease-in-out'
          }}
          alt={student.name}
          src={student.imgUrl}
        />
      </IconButton>
      <Typography>{student.name}</Typography>
    </Box>
  )
}

export function UserSelect() {
  const users = useSelector((s) => s.students)
  return (
    <Box sx={{ flex: 1, display: 'grid', placeItems: 'center' }}>
      <Grid
        container
        spacing={5}
        alignContent={'center'}
        justifyContent={'center'}
      >
        {users.map((user) => (
          <Grid key={user.id} item justifyItems={'center'}>
            <UserButton student={user} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
