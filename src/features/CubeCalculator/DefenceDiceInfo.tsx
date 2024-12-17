import React from 'react'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import { DataContext } from './DataProvider'
import DiceIcon from '@mui/icons-material/Casino'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import { calculateDamage } from '../../utils/damage'

function calculateDiceCount(successOnNumber: number, totalDiceCount: number) {
  const successPercentage = ((7 - successOnNumber) * 100) / 6
  const expectedSuccessCount = (successPercentage / 100) * totalDiceCount

  return Math.round(expectedSuccessCount)
}

export const DefenceDiceInfo = () => {
  const {
    attack: { diceCount, skillValue, normalDamage, criticalDamage, specialRules },
    defence: { diceCount: defenceDiceCount, saveValue, wounds }
  } = React.useContext(DataContext)

  const successfulDiceCount = React.useMemo(() => calculateDiceCount(saveValue, defenceDiceCount), [saveValue, defenceDiceCount])
  const damage = React.useMemo(
    () => {
      const damage = calculateDamage(diceCount, skillValue, normalDamage, criticalDamage, specialRules)
      const save = (7 - saveValue) / 6

      return damage - save
    },
    [diceCount, skillValue, normalDamage, criticalDamage, specialRules]
  )

  return (
    <Card variant='soft'>
      <CardContent>
        <Typography level='title-lg'>Defence info</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Save dice count:</Typography>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {new Array(successfulDiceCount).fill(0).map((_val, index) => (
              <DiceIcon key={`dice-${index}`} />
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Damage after saves:</Typography>
          <Typography>{damage} wounds</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
