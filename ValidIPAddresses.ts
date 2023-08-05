// Solution 1, O(1) time complexity, O(1) space complexity
export function validIPAddresses(string: string) {
  const result: string[] = []

  validIPAddressesHelper(string, result, [])

  return result
}

function validIPAddressesHelper(
  string: string,
  result: string[],
  ipToValid: string[]
) {
  if (ipToValid.length === 4) {
    !string && result.push(ipToValid.join('.'))
    return
  }

  for (let i = 1; i <= Math.min(3, string.length); i++) {
    const nextIpPart = string.slice(0, i)

    if (+nextIpPart > 255) break

    const nextIpToValid = [...ipToValid, nextIpPart]
    validIPAddressesHelper(string.slice(i), result, nextIpToValid)

    if (+nextIpPart === 0) break
  }
}
