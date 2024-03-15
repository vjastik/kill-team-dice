import React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import {DataContext, SpecialRuleItemType} from "./DataProvider";
import DiceIcon from '@mui/icons-material/Casino';
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import {SP} from "../../constants/specialRules";

function calculateDiceCount(successOnNumber: number, totalDiceCount: number) {
  const successPercentage = (7 - successOnNumber) * 100 / 6
  const expectedSuccessCount = (successPercentage / 100) * totalDiceCount;

  return Math.round(expectedSuccessCount);
}

function calculateDamage(diceCount: number, skillValue: number, normalDamage: number, criticalDamage: number, specialRules: SpecialRuleItemType[]): number {
  // let successProbability = (7 - skillValue) / 6;
  // if (specialRules.some(item => item.label === SP.balanced)) {
  //   // Adjust success probability to account for rerolls
  //   const failProbability = 1 - successProbability;
  //   const reRollSuccessProbability = failProbability * (7 - skillValue) / 6;
  //   successProbability += reRollSuccessProbability;
  // }
  //
  //
  // const expectedSuccessCount = diceCount * successProbability;
  // const expectedNormalDamage = expectedSuccessCount * normalDamage;
  // const expectedCriticalDamage = (expectedSuccessCount / 6) * criticalDamage;
  //
  // // Calculate the total expected damage
  // return Math.round((expectedNormalDamage + expectedCriticalDamage) * 10) / 10

  const averageDamagePerDice = ((6 - skillValue) * normalDamage + criticalDamage) / 6;
  let averageDamage = averageDamagePerDice * diceCount;

  if (specialRules.some(item => item.label === SP.balanced)) {
    const successProbability = (7 - skillValue) / 6; // Ймовірність успішного кидка кубика
    const failedProbability = 1 - successProbability; // Ймовірність неуспішного кидка кубика
    const averageFailedDiceValue = (failedProbability * 3.5); // Середнє значення неуспішного кидка кубика
    averageDamage += (averageFailedDiceValue * diceCount);
  }

  return Math.round(averageDamage * 10) / 10;
}

export const AttackDiceInfo = () => {
  const {
    attack: {
      diceCount,
      skillValue,
      normalDamage,
      criticalDamage,
      specialRules
    }
  } = React.useContext(DataContext)

  const successfulDiceCount = React.useMemo(() => calculateDiceCount(skillValue, diceCount), [skillValue, diceCount])
  const damage = React.useMemo(() => calculateDamage(diceCount, skillValue, normalDamage, criticalDamage, specialRules), [diceCount, skillValue, normalDamage, criticalDamage, specialRules])

  return (
    <Card variant="soft">
      <CardContent>
        <Typography level="title-lg">Dice info</Typography>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography>Successful dices:</Typography>
          <Box sx={{display: 'flex', gap: 0.5}}>
            {(new Array(successfulDiceCount)).fill(0).map((_val, index) => (
              <DiceIcon key={`dice-${index}`}/>
            ))}
          </Box>
        </Box>

        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography>Damage:</Typography>
          <Typography>{damage} wounds</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
