/**
 * Incoming object shape
 */
export interface PostInput {
  poster?: string
  timestamp: number
  message?: string
  winner?: boolean
}

/**
 * Internal object shape
 */
export interface Post {
  address?: string
  timestamp: Date
  message?: string
  winner?: boolean
}

/**
 * The smart contract object
 */
export type Contract = any
