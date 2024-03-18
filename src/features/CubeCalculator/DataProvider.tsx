import React from 'react'
import { SpecialRulesType } from '../../constants/specialRules'

export type AttackSettingsType = {
  diceCount: number
  skillValue: number
  normalDamage: number
  criticalDamage: number
  specialRules: SpecialRuleItemType[]
}

export type SpecialRuleItemType = {
  label: string
  value: SpecialRulesType
  xValue?: number
}

type DataContextType = {
  attack: AttackSettingsType
  changeAttackSettings: (name: keyof AttackSettingsType, value: SpecialRuleItemType[] | number) => void
}

export const DataContext = React.createContext<DataContextType>({
  attack: {
    diceCount: 4,
    skillValue: 3,
    normalDamage: 3,
    criticalDamage: 4,
    specialRules: []
  },
  changeAttackSettings: () => {}
})

export const DataProvider: React.FC<React.PropsWithChildren> = props => {
  const [attack, setAttackSettings] = React.useState<AttackSettingsType>({
    diceCount: 4,
    skillValue: 3,
    normalDamage: 3,
    criticalDamage: 4,
    specialRules: []
  })

  const changeAttackSettings = (name: keyof AttackSettingsType, value: number | SpecialRuleItemType[]) => {
    setAttackSettings({
      ...attack,
      [name]: value
    })
  }

  return <DataContext.Provider value={{ attack, changeAttackSettings }}>{props.children}</DataContext.Provider>
}
