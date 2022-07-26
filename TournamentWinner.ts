// Solution 1, O(n) time complexity, O(k) space complexity where n is the number of competitions and k is the number of teams
export const tournamentWinner = (
  competitions: string[][],
  results: number[]
) => {
  let bestTeam = ''

  const pointsMap = competitions.reduce<{ [key: string]: number }>(
    (acc, curr, i) => {
      const winnerTeam = curr[Math.abs(results[i] - 1)]
      const pointsToAssign = winnerTeam in acc ? acc[winnerTeam] + 3 : 3

      if (pointsToAssign > (acc[bestTeam] || 0)) bestTeam = winnerTeam

      return { ...acc, [winnerTeam]: pointsToAssign }
    },
    {}
  )

  return bestTeam
}
