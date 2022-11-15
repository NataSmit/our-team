import React from 'react';


export default function Header({children, member, logout}) {
  

  return (
    <header className='header'>
      <div className= {`header__container ${member ? 'header__container_type_member' : ''}`}>
        {children}
        <button className='header__button' onClick={() =>logout()} >Выход</button>
        <button className='header__button-small' onClick={() =>logout()} ></button>
      </div>
    </header>
  )
}
