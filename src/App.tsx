import React from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
import { Main } from './Main'

export default function App() {
  return (
    <div className="bg-gray-100 w-full font-sans text-indigo-800 px-2 md:px-4">
      <div className="w-full min-h-screen mx-auto items-center justify-between flex flex-col">
        <div>
          <Header />
          <Main />
        </div>
        <Footer />
      </div>
    </div>
  )
}
