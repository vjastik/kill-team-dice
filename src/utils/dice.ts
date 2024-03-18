import { isEmpty, sum } from 'lodash'
import { SpecialRuleItemType } from '../features/CubeCalculator/DataProvider'
import { getSpecialRule } from './helpers'

export const generateDiceRolls = (
  diceCount: number,
  skillValue: number,
  criticalSkillValue: number,
  normalDamage: number,
  criticalDamage: number,
  damagePerDice: number,
  specialRules: SpecialRuleItemType[]
): number => {
  const getSP = getSpecialRule(specialRules)

  const rolls: number[][] = []
  const diceDamageMap = [0, 0, 0, 0, 0, 0]
  const withCeaseless = getSP('ceaseless')

  diceDamageMap.forEach((item, index) => {
    const slotCount = index + 1

    if (slotCount >= skillValue) diceDamageMap[index] = normalDamage
    if (slotCount >= criticalSkillValue) diceDamageMap[index] = criticalDamage
  })

  function generateRollHelper(diceValues: number[], currentIndex: number) {
    if (currentIndex === diceCount) {
      const copy = diceValues.slice()

      rolls.push(copy)
      return
    }

    for (let i = 0; i < 6; i++) {
      diceValues[currentIndex] = i

      generateRollHelper(diceValues, currentIndex + 1)
    }
  }

  generateRollHelper(new Array(diceCount).fill(0), 0)

  rolls.forEach((throwResults, index) => {
    const roll = throwResults.map(item => diceDamageMap[item])

    // Find dice with result of 1 (index: 0)
    const diceResultOfOne = throwResults.reduce((result, current, currentIndex) => {
      if (current !== 0) return result
      return [...result, currentIndex]
    }, [] as number[])

    if (withCeaseless && !isEmpty(diceResultOfOne)) {
      diceResultOfOne.forEach(index => roll[index] = damagePerDice)
    }

    const dieReRoll = throwResults.findIndex((item, index) => {
      if (withCeaseless && diceResultOfOne.some(dieIndex => dieIndex === index)) return false

      if (roll[index] > 0 && diceDamageMap[item] === 0) debugger
      return diceDamageMap[item] === 0
    })
    if (dieReRoll !== -1) {
      roll[dieReRoll] = damagePerDice
    }

    rolls[index] = roll
  })

  const damagePossibilities = rolls.map(item => sum(item))

  return sum(damagePossibilities) / damagePossibilities.length
}
