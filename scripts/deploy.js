/* eslint-disable no-undef */

async function main() {
  const moonContractFactory = await hre.ethers.getContractFactory('MoonPortal')
  const moonContract = await moonContractFactory.deploy({
    value: hre.ethers.utils.parseEther('0.001'),
  })

  await moonContract.deployed()

  console.log('MoonPortal address: ', moonContract.address)
}

async function runMain() {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

runMain()
