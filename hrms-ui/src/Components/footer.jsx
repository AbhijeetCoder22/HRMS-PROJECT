import React from 'react'

const Footer = () => {
    const d = new Date();
    let year = d.getFullYear();

  return (
    <footer>
        <p>&copy; {year} All Rights Reserved</p>
    </footer>
  )
}

export default Footer