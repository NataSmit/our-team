import React from 'react'

export default function Header() {
  return (
    <header className='header'>
      <div className='header__container'>
        <h1 className='header__title'>Наша команда</h1>
        <p className='header__subtitle'>
          Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и 
          умеющие находить выход из любых, даже самых сложных ситуаций. 
        </p>
        <button className='header__button'>Выход</button>
      </div>
    </header>
  )
}
