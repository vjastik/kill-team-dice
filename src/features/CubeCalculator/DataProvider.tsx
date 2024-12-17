import React from 'react'
import { SpecialRulesType } from '../../constants/specialRules'

export type AttackSettingsType = {
  diceCount: number
  skillValue: number
  normalDamage: number
  criticalDamage: number
  specialRules: SpecialRuleItemType[]
}

export type DefenderSettingsType = {
  diceCount: number
  saveValue: number
  wounds: number
}

export type SpecialRuleItemType = {
  label: string
  value: SpecialRulesType
  xValue?: number
}

type DataContextType = {
  attack: AttackSettingsType
  defence: DefenderSettingsType
  changeAttackSettings: (name: keyof AttackSettingsType, value: SpecialRuleItemType[] | number) => void
  changeDefenceSettings: (name: keyof DefenderSettingsType, value: number) => void
}

export const DataContext = React.createContext<DataContextType>({
  attack: {
    diceCount: 4,
    skillValue: 3,
    normalDamage: 3,
    criticalDamage: 4,
    specialRules: []
  },
  defence: {
    diceCount: 3,
    saveValue: 4,
    wounds: 8
  },
  changeAttackSettings: () => {},
  changeDefenceSettings: () => {}
})

export const DataProvider: React.FC<React.PropsWithChildren> = props => {
  const [attack, setAttackSettings] = React.useState<AttackSettingsType>({
    diceCount: 4,
    skillValue: 3,
    normalDamage: 3,
    criticalDamage: 4,
    specialRules: []
  })
  const [defence, setDefenceSettings] = React.useState<DefenderSettingsType>({
    diceCount: 3,
    saveValue: 4,
    wounds: 8
  })

  const changeAttackSettings = (name: keyof AttackSettingsType, value: number | SpecialRuleItemType[]) => {
    setAttackSettings({
      ...attack,
      [name]: value
    })
  }

  const changeDefenceSettings = (name: keyof DefenderSettingsType, value: number) => {
    setDefenceSettings({
      ...defence,
      [name]: value
    })
  }

  return <DataContext.Provider value={{ attack, defence, changeAttackSettings, changeDefenceSettings }}>{props.children}</DataContext.Provider>
}
