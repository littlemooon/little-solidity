import { ethers } from 'ethers'
import { Contract, Post, PostInput } from '../types'
import abi from './MoonPortal.json'

/**
 * Function to return ethereum global
 */
export function getEth() {
  if (window.ethereum) {
    return window.ethereum
  } else {
    throw new Error(
      "Ethereum object doesn't exist! Make sure you have metamask!"
    )
  }
}

/**
 * Request account connection with the users wallet
 */
export async function connectWallet() {
  try {
    const ethereum = getEth()

    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    })

    return accounts[0]
  } catch (error) {
    console.error(error)
  }
}

/**
 * Query the blockchain for the connected account
 */
export async function getConnectedAccount(): Promise<string | undefined> {
  try {
    const ethereum = getEth()

    const accounts = await ethereum.request({ method: 'eth_accounts' })

    if (accounts.length !== 0) {
      const account = accounts[0]
      console.log('Found an authorized account:', account)
      return account
    }
  } catch (error) {
    console.error(error)
  }
}

/**
 * Parse the object from the blockchain
 */
function parsePosts(posts: PostInput[]): Post[] {
  return posts.map((post: PostInput): Post => {
    return {
      address: post.poster,
      timestamp: new Date(post.timestamp * 1000),
      message: post.message,
      winner: post.winner,
    }
  })
}

/**
 * Create an instance of the contract
 */
function getContract(): Contract {
  const ethereum = getEth()
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS

  if (contractAddress) {
    const contract = new ethers.Contract(contractAddress, abi.abi, signer)

    return contract
  } else {
    throw new Error('No contract address configured')
  }
}

/*
 * Query blockchain for list of all posts
 */
export async function getPosts(
  contract = getContract()
): Promise<Post[] | undefined> {
  try {
    const posts = await contract.getAllPosts()

    return parsePosts(posts)
  } catch (error) {
    console.error(error)
  }
}

/*
 * Create a method that gets all waves from your contract
 */
export async function post(
  message: string,
  contract = getContract()
): Promise<
  { contract: Contract; txn: ReturnType<Contract['wave']> } | undefined
> {
  try {
    /*
     * Execute the actual wave from your smart contract
     */
    const txn = await contract.post(message)

    return {
      contract,
      txn,
    }
  } catch (error) {
    console.error(error)
  }
}
