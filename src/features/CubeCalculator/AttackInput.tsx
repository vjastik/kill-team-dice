import React from 'react'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import Typography from '@mui/joy/Typography'
import Button from '@mui/joy/Button'
import Box from '@mui/joy/Box'
import { AttackSettingsType, DataContext } from './DataProvider'
import Divider from '@mui/joy/Divider'
import { SpecialRulesPicker } from './SpecialRulesPicker'
import Chip from '@mui/joy/Chip'
import { SP } from '../../constants/specialRules'

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

export const AttackInput = () => {
  const {
    attack: { diceCount, skillValue, normalDamage, criticalDamage, specialRules },
    attack,
    changeAttackSettings
  } = React.useContext(DataContext)

  const [open, setOpen] = React.useState<boolean>(false)

  const handleChangeCubes = (name: keyof Omit<AttackSettingsType, 'specialRules'>, modifier: number) => () => {
    if (attack[name] + modifier < 0) return
    if (name === 'skillValue' && attack[name] + modifier > 6) return

    changeAttackSettings(name, attack[name] + modifier)
  }

  return (
    <Card variant="soft">
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <Typography level="title-lg">Attack input</Typography>
            <Typography>Add you attack dice characteristics</Typography>
          </div>
        </Box>

        <Box sx={settingsBoxSx}>
          <Box sx={inputBoxSx}>
            <Typography>Dice count:</Typography>
            <Button onClick={handleChangeCubes('diceCount', -1)}>-1</Button>
            <Typography textAlign="center">{diceCount}</Typography>
            <Button onClick={handleChangeCubes('diceCount', 1)}>+1</Button>
          </Box>

          <Box sx={inputBoxSx}>
            <Typography>BS/WS:</Typography>
            <Button onClick={handleChangeCubes('skillValue', -1)}>-1</Button>
            <Typography textAlign="center">{skillValue}+</Typography>
            <Button onClick={handleChangeCubes('skillValue', 1)}>+1</Button>
          </Box>
        </Box>

        <Divider />

        <Box sx={settingsBoxSx}>
          <Box sx={inputBoxSx}>
            <Typography>Normal Damage:</Typography>
            <Button onClick={handleChangeCubes('normalDamage', -1)}>-1</Button>
            <Typography textAlign="center">{normalDamage}</Typography>
            <Button onClick={handleChangeCubes('normalDamage', 1)}>+1</Button>
          </Box>
          <Box sx={inputBoxSx}>
            <Typography>Critical Damage:</Typography>
            <Button onClick={handleChangeCubes('criticalDamage', -1)}>-1</Button>
            <Typography textAlign="center">{criticalDamage}</Typography>
            <Button onClick={handleChangeCubes('criticalDamage', 1)}>+1</Button>
          </Box>
        </Box>

        <Divider />

        <Box sx={settingsBoxSx}>
          <Button onClick={() => setOpen(true)}>Manage Special Rules</Button>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', paddingTop: 1 }}>
            {specialRules.map(item => {
              const plus = item.label === SP.lethal ? '+' : ''
              const xValue = item.xValue ? `: ${item.xValue}${plus}` : ''

              return (
                <Chip key={`chip-sp-${item.value}`} color="neutral" variant="outlined">
                  {item.label}
                  {xValue}
                </Chip>
              )
            })}
          </Box>
        </Box>
      </CardContent>

      <SpecialRulesPicker open={open} handleClose={() => setOpen(false)} />
    </Card>
  )
}
