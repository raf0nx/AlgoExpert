// Solution 1, O(n^2) time complexity, O(n^2) space complexity where n is the number of interns and teams
export function stableInternships(interns: number[][], teams: number[][]) {
  const chosenInterns: Record<number, number> = {}
  const freeInterns = interns.map((_, i) => i)
  const currInternChoices = [...freeInterns].fill(0)
  const teamsMap = constructTeamsPreferencesMap(teams)

  while (freeInterns.length) {
    const intern = freeInterns.pop()!
    const preferredTeam = interns[intern][currInternChoices[intern]]
    currInternChoices[intern] += 1

    if (!(preferredTeam in chosenInterns)) {
      chosenInterns[preferredTeam] = intern
      continue
    }

    const prevChosenIntern = chosenInterns[preferredTeam]
    const prevChosenInternRank = teamsMap[preferredTeam][prevChosenIntern]
    const internRank = teamsMap[preferredTeam][intern]

    if (prevChosenInternRank < internRank) {
      freeInterns.push(intern)
    } else {
      chosenInterns[preferredTeam] = intern
      freeInterns.push(prevChosenIntern)
    }
  }

  return Object.entries(chosenInterns).map(([team, intern]) => [intern, +team])
}

function constructTeamsPreferencesMap(teams: number[][]) {
  return teams.map(teamPref =>
    teamPref.reduce<Record<number, number>>(
      (rank, intern, rankValue) => ({ ...rank, [intern]: rankValue }),
      {}
    )
  )
}
