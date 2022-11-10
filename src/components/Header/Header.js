import React from 'react';


export default function Header({children, member}) {
  return (
    <header className='header'>
      <div className= {`header__container ${member ? 'header__container_type_member' : ''}`}>
        {children}
        <button className='header__button'>Выход</button>
      </div>
    </header>
  )
}
