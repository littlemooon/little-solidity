import React, { SyntheticEvent, useEffect, useState } from 'react'
import * as eth from './utils/ethereum'
import { Contract, Post } from './types'

export function Main() {
  const [loading, setLoading] = useState<string | undefined>()
  const [allPosts, setAllPosts] = useState<Post[]>([])
  const [currentAccount, setCurrentAccount] = useState<string | undefined>()

  /**
   * Update connected account from the blockchain
   */
  async function updateConnectedAccount() {
    const account = await eth.getConnectedAccount()
    setCurrentAccount(account)
  }

  /**
   * Update list of posts from the blockchain
   */
  async function updatePosts(contract?: Contract) {
    const posts = await eth.getPosts(contract)
    setAllPosts(posts ?? [])
  }

  /**
   * Get the current account on mount
   */
  useEffect(() => {
    updateConnectedAccount()
  }, [])

  /**
   * Update posts on account change
   */
  useEffect(() => {
    if (currentAccount) {
      updatePosts()
    }
  }, [currentAccount])

  /**
   * Handle login
   */
  async function onConnectWallet() {
    setLoading('Connecting wallet...')
    const account = await eth.connectWallet()
    setCurrentAccount(account)
    setLoading(undefined)
  }

  /**
   * Handle logout
   */
  function onDisconnectWallet() {
    setCurrentAccount(undefined)
  }

  /**
   * Handle posting and refresh posts
   */
  async function onPost(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading('Sending mooon...')
    const response = await eth.post(`${e.currentTarget.moon.value}`)

    setLoading('Mining mooon...')
    await response?.txn.wait()

    setLoading('Updating mooons...')
    await updatePosts(response?.contract)

    setLoading(undefined)
  }

  return (
    <main>
      {currentAccount ? (
        <form onSubmit={onPost} className="flex flex-col">
          <select
            name="moon"
            className="p-2 border-2 rounded-xl hover:border-indigo-800"
          >
            {['🌝', '🌛', '🌚', '🌜'].map((moon) => (
              <option key={moon} value={moon}>
                {moon}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={!!loading}
            className="p-2 rounded-xl border-2 border-gray-200 bg-gray-200 hover:border-indigo-800 mt-2"
          >
            {loading || 'Mooon at Me'}
          </button>
        </form>
      ) : (
        <button
          onClick={onConnectWallet}
          disabled={!!loading}
          className="w-full p-2 rounded-xl border-2 border-gray-200 bg-gray-200 hover:border-indigo-800"
        >
          {loading || 'Connect Wallet'}
        </button>
      )}

      {allPosts.length ? (
        <div className="w-full  py-2">
          I have been moooned <b>{allPosts.length}</b> time
          {allPosts.length > 1 ? 's' : null}
        </div>
      ) : null}

      <ul>
        {allPosts.map((post, index) => {
          return (
            <li
              key={index}
              className="mb-2 rounded-xl border-2 border-gray-100 hover:border-indigo-800 p-2 flex items-center"
            >
              <div className="text-3xl ml-2 mr-4">{post.message}</div>
              <div>
                <div>{post.address}</div>
                <div>{post.timestamp.toString()}</div>
                {post.winner ? <div>WINNER</div> : null}
              </div>
            </li>
          )
        })}
      </ul>

      {currentAccount ? (
        <button
          className="disconnect"
          onClick={onDisconnectWallet}
          disabled={!!loading}
        >
          Disconnect
        </button>
      ) : null}
    </main>
  )
}
