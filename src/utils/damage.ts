import { SpecialRuleItemType } from '../features/CubeCalculator/DataProvider'
import { generateDiceRolls } from './dice'
import { getSpecialRule } from './helpers'

export const calculateDamage = (
  diceCount: number,
  skillValue: number,
  normalDamage: number,
  critDamage: number,
  specialRules: SpecialRuleItemType[]
): number => {
  const getSP = getSpecialRule(specialRules)
  let criticalDamage = critDamage

  let criticalSkillValue = 6
  const lethalRule = getSP('lethal')
  const mortalRule = getSP('mw')

  if (lethalRule) {
    criticalSkillValue = lethalRule.xValue || 6
  }

  if (mortalRule) {
    criticalDamage = critDamage + (mortalRule.xValue || 0)
  }

  let normalHitProb = (criticalSkillValue - skillValue) / 6
  let criticalHitProb = (7 - criticalSkillValue) / 6

  const averageDamagePerDice = normalHitProb * normalDamage + criticalHitProb * criticalDamage

  const averageDamage = generateDiceRolls(
    diceCount,
    skillValue,
    criticalSkillValue,
    normalDamage,
    criticalDamage,
    averageDamagePerDice,
    specialRules
  )

  return Math.round(averageDamage * 100) / 100
}
