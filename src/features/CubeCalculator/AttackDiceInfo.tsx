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

export const AttackDiceInfo = () => {
  const {
    attack: { diceCount, skillValue, normalDamage, criticalDamage, specialRules }
  } = React.useContext(DataContext)

  const successfulDiceCount = React.useMemo(() => calculateDiceCount(skillValue, diceCount), [skillValue, diceCount])
  const damage = React.useMemo(
    () => calculateDamage(diceCount, skillValue, normalDamage, criticalDamage, specialRules),
    [diceCount, skillValue, normalDamage, criticalDamage, specialRules]
  )

  return (
    <Card variant="soft">
      <CardContent>
        <Typography level="title-lg">Dice info</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Successful dices:</Typography>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {new Array(successfulDiceCount).fill(0).map((_val, index) => (
              <DiceIcon key={`dice-${index}`} />
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Damage:</Typography>
          <Typography>{damage} wounds</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
