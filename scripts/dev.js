/* eslint-disable no-undef */

async function main() {
  const moonContractFactory = await hre.ethers.getContractFactory('MoonPortal')
  const moonContract = await moonContractFactory.deploy({
    value: hre.ethers.utils.parseEther('0.1'),
  })
  await moonContract.deployed()
  console.log('Contract addy:', moonContract.address)

  let contractBalance = await hre.ethers.provider.getBalance(
    moonContract.address
  )
  console.log(
    'Contract balance:',
    hre.ethers.utils.formatEther(contractBalance)
  )

  /*
   * Let's try two posts now
   */
  const txn = await moonContract.post('This is post #1')
  await txn.wait()

  const txn2 = await moonContract.post('This is post #2')
  await txn2.wait()

  contractBalance = await hre.ethers.provider.getBalance(moonContract.address)
  console.log(
    'Contract balance:',
    hre.ethers.utils.formatEther(contractBalance)
  )

  let allPosts = await moonContract.getAllPosts()
  console.log(allPosts)
}

async function runMain() {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

runMain()
