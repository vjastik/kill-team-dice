import React from 'react'

import './App.css'
import '@fontsource/inter'

import { CssVarsProvider } from '@mui/joy/styles'
import CssBaseline from '@mui/joy/CssBaseline'
import Box from '@mui/joy/Box'
import { AttackInput } from './features/CubeCalculator/AttackInput'
import { DataProvider } from './features/CubeCalculator/DataProvider'
import { AttackDiceInfo } from './features/CubeCalculator/AttackDiceInfo'
import { DefenceInput } from './features/CubeCalculator/DefenceInput'

function App() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <DataProvider>
        <Box
          sx={{
            margin: 'auto',
            width: '100%',
            maxWidth: 500,
            display: 'grid',
            gap: 2,
            padding: 2
          }}
        >
          <AttackInput />
          <AttackDiceInfo />
          <DefenceInput />
        </Box>
      </DataProvider>
    </CssVarsProvider>
  )
}

export default App
