import { createTheme } from '@mui/material/styles'

// A custom theme for this app
export const theme = createTheme({
  palette: {
    primary: {
      main: '#f57c00',
      light: '#ff9800',
      dark: '#e65100',
      contrastText: '#fff'
    },
    secondary: {
      main: '#00AB55',
      light: '#33CC70',
      dark: '#009357',
      contrastText: '#fff'
    },
    text: {
      primary: '#2d3748',
      secondary: '#646e73'
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    background: {
      paper: '#fff',
      default: '#fff'
    }
  }
})
