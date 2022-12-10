import React from 'react'
import HeaderTile from './HeaderTile'

const headerLinks = [
  {
    title: 'Home',
    link: '/',
  },
  {
    title: 'Bus Search',
    link: '/list',
  },
  {
    title: 'About',
    link: '/about',
  },
]

const Header: React.FC = () => {
  const headerTiles = headerLinks.map((val, index) => {
    return (
      <HeaderTile title={val.title} link={val.link} key={index}></HeaderTile>
    )
  })

  return (
    <>
      <head>
        <link href="/dist/output.css" rel="stylesheet"></link>
      </head>
      <nav className="grid grid-cols-3 lg:py-4 bg-gray-900">
        {headerTiles}
      </nav>
    </>
  )
}

export default Header
