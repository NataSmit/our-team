import './App.css';
import axios from 'axios';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addMembers} from './store/teamMembersSlice';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import MemberPage from './components/MemberPage/MemberPage';
import {Route, Switch, useHistory} from 'react-router-dom';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import InfoTooltip from './components/InfoTooltip/InfoTooltip'


function App() {
  const dispatch = useDispatch()
  const teamMembers = useSelector( (state) => state.teamMembersSlice.teamMembers)
  const history = useHistory();
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [message, setMessage] = useState({
    successful: undefined,
    message: "",
  });
  const [serverError, setServerError] = useState('')

  console.log('serverError', serverError.slice(10, -2))

 useEffect(() => {
  myFetch()
 }, [])

  
  async function myFetch() {

    try {
      const myData = await axios.get('https://reqres.in/api/users')
      const result = myData.data.data;
      console.log('result', result)
      dispatch(addMembers(result)) 
     
    } catch (err) {
       console.log(err)
    }
    
  }

  function handleRegistration(mail, password) {
    axios.post('https://reqres.in/api/register', {
      email: mail,
      password: password
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.token) {
        setIsInfoTooltipOpen(true);
        setMessage({
          successful: true,
          message: "Вы успешно зарегистрировались!",
        });
        history.push('/login')
      }
      localStorage.setItem('jwt', res.data.token)
      
    })
    .catch((error) => {
      console.log(error.request.response.error);
      setServerError(error.request.response)
      setIsInfoTooltipOpen(true);
      setMessage({
        successful: false,
        message: "Что-то пошло не так! Попробуйте ещё раз.",
      });
    });
  }

  function handleLogin(mail, password) {
    axios.post('https://reqres.in/api/login', {
      email: mail,
      password: password
    })
    .then((res) => {
      console.log(res.data);
      localStorage.setItem('jwt', res.data.token)
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
  }

 
  return (
    <div className="wrapper">
      <div className='root'>
        <Switch>
          <Route exact path='/registration'>
            <Registration handleRegistration={handleRegistration} serverError={serverError}/>
          </Route>
          <Route exact path='/login'>
            <Login handleLogin={handleLogin}/>
          </Route>
          <Route exact path='/'>
            <Header>
              <h1 className='header__title'>Наша команда</h1>
              <p className='header__subtitle'>
                Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и 
                умеющие находить выход из любых, даже самых сложных ситуаций. 
              </p>
            </Header>
            <Main teamMembers={teamMembers} />
          </Route>
          <Route exact path='/:id'>
            <MemberPage />
          </Route>
          
        </Switch>
        
      </div>
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeInfoTooltip}
        message={message.message}
        successful={message.successful}
      />
    </div>
  );
}

export default App;
