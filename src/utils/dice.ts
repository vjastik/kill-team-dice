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

  let rolls: number[][] = []
  const diceDamageMap = [0, 0, 0, 0, 0, 0]
  const rendingReRolledDamagePerDice = ((7 - skillValue) * criticalDamage) / 6

  const ceaselessRule = getSP('ceaseless')
  const balancedRule = getSP('balanced')
  const rendingRule = getSP('rending')
  const relentlessRule = getSP('relentless')

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
    // Rending rule can change result
    let diceResults = throwResults
    let roll = diceResults.map(item => diceDamageMap[item])

    // Find dice with result of 1 (index: 0)
    const diceResultOfOne = diceResults.reduce((result, current, currentIndex) => {
      if (current !== 0) return result
      return [...result, currentIndex]
    }, [] as number[])

    // Ceaseless Rule extension
    if (ceaselessRule && !isEmpty(diceResultOfOne)) {
      diceResultOfOne.forEach(index => roll[index] = damagePerDice)
    }

    // Balanced Rule extension
    if (balancedRule) {
      const dieReRoll = diceResults.findIndex((item, index) => {
        if (ceaselessRule && diceResultOfOne.some(dieIndex => dieIndex === index)) return false

        return diceDamageMap[item] === 0
      })
      if (dieReRoll !== -1) {
        roll[dieReRoll] = damagePerDice
      }
    }

    // Relentless Rule extension
    if (relentlessRule) {
      roll = roll.map(item => item === 0 ? damagePerDice : item)
    }

    // Rending rule extension
    if (rendingRule && diceResults.some(item => (item + 1) >= criticalSkillValue)) {
      const indexOfNormalHit = roll.findIndex(item => item === normalDamage)
      const indexOfNormalReRolledHit = roll.findIndex(item => item === damagePerDice)

      if (indexOfNormalHit !== -1) {
        diceResults[indexOfNormalHit] = 5
        roll[indexOfNormalHit] = criticalDamage
      } else if (indexOfNormalReRolledHit !== -1) {

        diceResults[indexOfNormalReRolledHit] = 5
        roll[indexOfNormalReRolledHit] = rendingReRolledDamagePerDice
      }
    }

    rolls[index] = roll
  })

  const damagePossibilities = rolls.map(item => sum(item))

  return sum(damagePossibilities) / damagePossibilities.length
}

export const calculateSuccessfulThrowPercentage = (
  diceCount: number,
  skillValue: number,
  specialRules: SpecialRuleItemType[]
): number => {
  const damage = generateDiceRolls(
    diceCount,
    skillValue,
    6, // criticalSkillValue is not needed for this calculation
    1, // normalDamage is not needed for this calculation
    1, // criticalDamage is not needed for this calculation
    1, // damagePerDice is not needed for this calculation
    specialRules
  )

  return Math.round(damage / diceCount * 10000) / 100
}
