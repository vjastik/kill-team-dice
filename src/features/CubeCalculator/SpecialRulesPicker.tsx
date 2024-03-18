import React from 'react'
import Modal from '@mui/joy/Modal'
import ModalClose from '@mui/joy/ModalClose'
import Typography from '@mui/joy/Typography'
import Sheet from '@mui/joy/Sheet'
import Autocomplete from '@mui/joy/Autocomplete'
import { SHOOT_SP, ShootSpType, SP } from '../../constants/specialRules'
import { DataContext, SpecialRuleItemType } from './DataProvider'
import Box from '@mui/joy/Box'
import { AutocompleteValue } from '@mui/base/useAutocomplete/useAutocomplete'
import Button from '@mui/joy/Button'
import { cloneDeep, isNil, set } from 'lodash'

type Props = {
  open: boolean
  handleClose: () => void
}

export const SpecialRulesPicker: React.FC<Props> = props => {
  const { open, handleClose } = props

  const {
    attack: { specialRules },
    changeAttackSettings
  } = React.useContext(DataContext)

  const handleChoose = (_event: React.SyntheticEvent, data: AutocompleteValue<ShootSpType, false, false, false>) => {
    if (!data) return
    if (specialRules.some(item => item.value === data.value)) return

    changeAttackSettings('specialRules', [
      ...specialRules,
      {
        label: data.label,
        value: data.value,
        ...(data.withX ? { xValue: 1 } : {})
      }
    ])
  }

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={handleClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg'
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography component="h2" id="modal-title" level="h4" textColor="inherit" fontWeight="lg" mb={1}>
          Special Rules Picker
        </Typography>
        <Typography id="modal-desc" textColor="text.tertiary">
          Here you can add special rules for your attack
        </Typography>
        <Autocomplete placeholder="Select special rule" options={SHOOT_SP} onChange={handleChoose} />
        <Box sx={{ display: 'grid', gap: 2, paddingTop: 2 }}>
          {specialRules.map((item, index) => {
            return <SpecialRuleItem key={`sp-${item.value}`} data={item} index={index} />
          })}
        </Box>
      </Sheet>
    </Modal>
  )
}

type ItemProps = {
  data: SpecialRuleItemType
  index: number
}

const SpecialRuleItem: React.FC<ItemProps> = props => {
  const {
    data: { label, value, xValue },
    index
  } = props
  const {
    changeAttackSettings,
    attack: { specialRules }
  } = React.useContext(DataContext)

  const spFromList = SHOOT_SP.find(item => item.value === value)

  const handleChangeXValue = (modifier: number) => () => {
    if (isNil(xValue)) return
    if (xValue + modifier < 0 || xValue + modifier > 6) return
    const rules = cloneDeep(specialRules)
    set(rules, `[${index}].xValue`, xValue + modifier)

    changeAttackSettings('specialRules', rules)
  }

  const handleRemove = () => {
    changeAttackSettings(
      'specialRules',
      specialRules.filter(item => item.value !== value)
    )
  }

  const plus = label === SP.lethal ? '+' : ''

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '2em 1fr 2em 2em 2em',
        height: 36,
        alignItems: 'center',
        gap: 1
      }}
    >
      <Button size="sm" color="neutral" onClick={handleRemove}>
        -
      </Button>
      <Typography level="body-sm">{label}</Typography>
      {!spFromList?.withX ? null : (
        <>
          <Button size="sm" onClick={handleChangeXValue(-1)}>
            -1
          </Button>
          <Typography textAlign="center">
            {xValue}
            {plus}
          </Typography>
          <Button size="sm" onClick={handleChangeXValue(1)}>
            +1
          </Button>
        </>
      )}
    </Box>
  )
}
