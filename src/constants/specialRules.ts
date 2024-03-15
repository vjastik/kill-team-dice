export const SP: { [key in SpecialRulesType]: string } = {
  ap: 'Armour Penetration (APx)',
  balanced: 'Balanced',
  ceaseless: 'Ceaseless',
  lethal: 'Lethal x',
  mw: 'Mortal Wounds (MWx)',
  p: 'Piercing (Px)',
  relentless: 'Relentless',
  rending: 'Rending'
}

export type SpecialRulesType = 'ap' | 'balanced' | 'ceaseless' | 'lethal' | 'mw' | 'p' | 'relentless' | 'rending'

export type ShootSpType = {
  label: string,
  value: SpecialRulesType,
  withX?: boolean
}

export const SHOOT_SP: ShootSpType[] = [{
  label: SP.ap,
  value: 'ap',
  withX: true
}, {
  label: SP.balanced,
  value: 'balanced'
}, {
  label: SP.ceaseless,
  value: 'ceaseless'
}, {
  label: SP.lethal,
  value: 'lethal',
  withX: true
}, {
  label: SP.mw,
  value: 'mw',
  withX: true
}, {
  label: SP.p,
  value: 'p',
  withX: true
}, {
  label: SP.relentless,
  value: 'relentless'
}, {
  label: SP.rending,
  value: 'rending'
}]
