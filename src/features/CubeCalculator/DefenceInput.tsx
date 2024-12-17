import React from 'react'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import Typography from '@mui/joy/Typography'
import Button from '@mui/joy/Button'
import Box from '@mui/joy/Box'
import { DataContext, DefenderSettingsType } from './DataProvider'

const inputBoxSx = {
  display: 'grid',
  gridTemplateColumns: '2fr 3em 3em 3em',
  alignItems: 'center',
  gap: 1
}

const settingsBoxSx = {
  display: 'grid',
  gap: 1,
  paddingTop: 1,
  paddingBottom: 1
}

export const DefenceInput = () => {
  const {
    defence: { diceCount, saveValue, wounds },
    defence,
    changeDefenceSettings
  } = React.useContext(DataContext)

  const handleChangeCubes = (name: keyof DefenderSettingsType, modifier: number) => () => {
    if (defence[name] + modifier < 0) return
    if (name === 'saveValue' && defence[name] + modifier > 6) return

    changeDefenceSettings(name, defence[name] + modifier)
  }

  return (
    <Card variant='soft'>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <Typography level='title-lg'>Defence input</Typography>
            <Typography>Add you defence dice characteristics</Typography>
          </div>
        </Box>

        <Box sx={settingsBoxSx}>
          <Box sx={inputBoxSx}>
            <Typography>Dice count:</Typography>
            <Button onClick={handleChangeCubes('diceCount', -1)}>-1</Button>
            <Typography textAlign='center'>{diceCount}</Typography>
            <Button onClick={handleChangeCubes('diceCount', 1)}>+1</Button>
          </Box>

          <Box sx={inputBoxSx}>
            <Typography>SV:</Typography>
            <Button onClick={handleChangeCubes('saveValue', -1)}>-1</Button>
            <Typography textAlign='center'>{saveValue}+</Typography>
            <Button onClick={handleChangeCubes('saveValue', 1)}>+1</Button>
          </Box>

          <Box sx={inputBoxSx}>
            <Typography>Wounds:</Typography>
            <Button onClick={handleChangeCubes('wounds', -1)}>-1</Button>
            <Typography textAlign='center'>{wounds}</Typography>
            <Button onClick={handleChangeCubes('wounds', 1)}>+1</Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
