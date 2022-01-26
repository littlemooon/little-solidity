import React from 'react'

export function Footer() {
  return (
    <footer className="pt-8 pb-8 w-full flex justify-center">
      <p className="text-indigo-800">
        <span className="text-sm">
          made on
          <span role="img" className="mx-1">
            🌏
          </span>
          by
        </span>
        <a
          className="font-semibold hover:underline ml-1"
          href="https://github.com/littlemooon"
        >
          fred wright
        </a>
      </p>
    </footer>
  )
}
