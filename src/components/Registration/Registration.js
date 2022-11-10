import React, {useState} from 'react';


export default function Registration() {

  const [newType, setNewType] = useState(false);
  const [newTypeRepeate, setNewTypeRepeate] = useState(false);

  function handleToggleViewBtn() {
    setNewType(!newType)
  }

  function handleToggleViewBtnRepeat() {
    setNewTypeRepeate(!newTypeRepeate)
  }



  return (
    <div className='registration'>
      <div className='registration__container'>
        <h1 className='registration__title'>Регистрация</h1>
        <form className='registration__form'>
          <label className='registration__lable' htmlFor='name'>Имя</label>
          <input className='registration__input' id='name' placeholder='Артур'/>
          <label className='registration__lable' htmlFor='mail' >Электронная почта</label>
          <input className='registration__input' id='mail' placeholder='example@mail.ru' type='email'/>
          <label className='registration__lable' >Пароль
            <input className='registration__input' id='password' type={`${newType ? 'text' : 'password'}`}  />
            <button className='registration__view-toggle' type='button'onClick={handleToggleViewBtn}></button>
          </label>
          <label className='registration__lable' >Подтвердите пароль
            <input className='registration__input' id='repeatPW' type={`${newTypeRepeate ? 'text' : 'password'}`}/>
            <button className='registration__view-toggle' type='button' onClick={handleToggleViewBtnRepeat}></button>
          </label>
          <button className='registration__button'>Зарегистрироваться</button>
        </form>
      </div>
    </div>
  )
}
