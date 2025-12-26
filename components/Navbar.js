import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='h-20 bg-amber-500 flex justify-between px-4 items-center'>
      <div className='logo font-bold text-2xl'>Shrink</div>

      <ul className='flex justify-center gap-4 items-center'>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/shorten">Shorten</Link></li>
        <li><Link href="/contact">Contact Us</Link></li>
        <li className="flex gap-2">
          <Link href="/shorten"><button className='bg-amber-700 rounded-lg shadow-lg p-4 py-1 font-bold'>Try Now</button></Link>
          <Link href="/github"><button className='bg-amber-700 rounded-lg shadow-lg p-4 py-1 font-bold'>Github</button></Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
