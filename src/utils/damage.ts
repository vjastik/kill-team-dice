import { SpecialRuleItemType } from '../features/CubeCalculator/DataProvider'
import { generateDiceRolls } from './dice'
import { getSpecialRule } from './helpers'

export const calculateDamage = (
  diceCount: number,
  skillValue: number,
  normalDamage: number,
  criticalDamage: number,
  specialRules: SpecialRuleItemType[]
): number => {
  const getSP = getSpecialRule(specialRules)

  let criticalSkillValue = 6
  const lethalRule = getSP('lethal')

  if (lethalRule) {
    criticalSkillValue = lethalRule.xValue || 6
  }

  let normalHitProb = (criticalSkillValue - skillValue) / 6
  let criticalHitProb = (7 - criticalSkillValue) / 6
  let failProb = 1 - normalHitProb - criticalHitProb

  const averageDamagePerDice = normalHitProb * normalDamage + criticalHitProb * criticalDamage
  let averageDamage = averageDamagePerDice * diceCount

  if (getSP('ceaseless')) {
    const multiplier = 1 + 1 / 6

    averageDamage = (
      normalHitProb * multiplier * normalDamage +
      criticalHitProb * multiplier * criticalDamage
    ) * diceCount
  }

  if (getSP('balanced')) {
    averageDamage = generateDiceRolls(
      diceCount,
      skillValue,
      criticalSkillValue,
      normalDamage,
      criticalDamage,
      averageDamagePerDice,
      specialRules
    )
  }

  if (getSP('relentless')) {
    const multiplier = 1 + failProb

    averageDamage = (
      normalHitProb * multiplier * normalDamage +
      criticalHitProb * multiplier * criticalDamage
    ) * diceCount
  }

  return Math.round(averageDamage * 100) / 100
}
