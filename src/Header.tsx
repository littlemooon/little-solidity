import React from 'react'

export function Header() {
  return (
    <header className=" flex flex-col md:flex-row items-center py-8 justify-center">
      <img alt="moon logo" src="mooon.svg" />
      <div className="flex flex-col md:ml-6 items-center md:items-start">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-none font-thin">
          littlemooon
        </h1>
        <h2 className="text-2xl font-medium sm:text-2xl md:text-3xl lg:text-4xl">
          design + development
        </h2>
        <div className="social flex mt-2">
          <a className="social__link" href="https://github.com/littlemooon">
            <img alt="github logo" src="social_github.svg" />
          </a>
          <a
            className="social__link"
            href="http://www.linkedin.com/in/fred-wright"
          >
            <img alt="linkedin logo" src="social_linkedin.svg" />
          </a>
          <a className="social__link" href="https://twitter.com/littlemooon">
            <img alt="twitter logo" src="social_twitter.svg" />
          </a>
        </div>
      </div>
    </header>
  )
}
