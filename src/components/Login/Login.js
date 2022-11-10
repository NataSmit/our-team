import React, {useState} from 'react';

export default function Login({handleLogin}) {

  const [newType, setNewType] = useState(false);
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')

  function handleToggleViewBtn() {
    setNewType(!newType)
  }

  function handleMailChange(e) {
    setMail(e.target.value)
  }

  function handlePwChange(e) {
    setPassword(e.target.value)
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    handleLogin(mail, password)
  }


  return (
    <div className='registration'>
      <div className='registration__container'>
        <h1 className='registration__title'>Вход</h1>
        <form className='registration__form' onSubmit={handleFormSubmit}>
          <label className='registration__lable' htmlFor='mail' >Электронная почта</label>
          <input  value={mail} onChange={handleMailChange} className='registration__input' id='mail' placeholder='example@mail.ru' type='email'/>
          <label className='registration__lable' >Пароль
            <input  className='registration__input registration__input_type_pw' id='password' 
            type={`${newType ? 'text' : 'password'}`}  
            value={password} onChange={handlePwChange}
            />
            <button className={`registration__view-toggle ${newType ? 'registration__view-toggle_type_visible' : ''}`} 
            type='button'
            onClick={handleToggleViewBtn}>
            </button>
          </label>
          
          <button className='registration__button'>Войти</button>
        </form>
      </div>
    </div>
  )
}
