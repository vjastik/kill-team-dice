import { SpecialRuleItemType } from '../features/CubeCalculator/DataProvider'
import { SP, SpecialRulesType } from '../constants/specialRules'

export const getSpecialRule = (list: SpecialRuleItemType[]) => (name: SpecialRulesType): SpecialRuleItemType | undefined => {
  return list.find(item => item.label === SP[name])
}