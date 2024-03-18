import React from 'react'

import './App.css'
import '@fontsource/inter'

import { CssVarsProvider } from '@mui/joy/styles'
import CssBaseline from '@mui/joy/CssBaseline'
import Box from '@mui/joy/Box'
import { CubesInput } from './features/CubeCalculator/CubesInput'
import { DataProvider } from './features/CubeCalculator/DataProvider'
import { AttackDiceInfo } from './features/CubeCalculator/AttackDiceInfo'

function App() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <DataProvider>
        <Box
          sx={{
            width: '100%',
            maxWidth: 500,
            display: 'grid',
            gap: 2,
            padding: 2
          }}
        >
          <CubesInput />
          <AttackDiceInfo />
        </Box>
      </DataProvider>
    </CssVarsProvider>
  )
}

export default App
