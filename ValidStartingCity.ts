// Solution 1, O(n^2) time complexity, O(1) space complexity
export function validStartingCity(
  distances: number[],
  fuel: number[],
  mpg: number
) {
  for (let startingCity = 0; startingCity < distances.length; startingCity++) {
    const isStartingCityValid = checkForValidStartingCity(
      distances,
      fuel,
      mpg,
      startingCity
    )

    if (isStartingCityValid) return startingCity
  }
}

function checkForValidStartingCity(
  distances: number[],
  fuel: number[],
  mpg: number,
  start: number
) {
  let citiesToVisitLeft = distances.length
  let currentCity = start
  let fuelLeft = 0

  while (citiesToVisitLeft) {
    fuelLeft += fuel[currentCity]

    const fuelToConsume = +(distances[currentCity] / mpg).toFixed(2)
    fuelLeft = +(fuelLeft - fuelToConsume).toFixed(2)

    if (fuelLeft < 0) return false

    currentCity = (currentCity + 1) % distances.length
    citiesToVisitLeft -= 1
  }

  return true
}

// Solution 2, O(n) time complexity, O(1) space complexity
export function validStartingCity2(
  distances: number[],
  fuel: number[],
  mpg: number
) {
  let startingCity = 0

  for (
    let city = 0, fuelLeft = 0, lowestFuelVal = Infinity;
    city < distances.length;
    city++
  ) {
    if (fuelLeft < lowestFuelVal) {
      startingCity = city
      lowestFuelVal = fuelLeft
    }

    fuelLeft += fuel[city]
    fuelLeft = Math.round((fuelLeft - distances[city] / mpg) * 100) / 100
  }

  return startingCity
}
