import './App.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Route, Switch, useHistory,
} from 'react-router-dom';
import { addMembers, getMembers } from './store/teamMembersSlice';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import MemberPage from './components/MemberPage/MemberPage';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import InfoTooltip from './components/InfoTooltip/InfoTooltip';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
// import {register, addUser} from './store/RegisteredUsersSlice';
import { register, login } from './api/api';

function App() {
  const dispatch = useDispatch();
  const teamMembers = useSelector((state) => state.teamMembersSlice.teamMembers);
  // const registeredUsers = useSelector( (state) => state.registeredUsersSlice.registeredUsers)
  const { error } = useSelector((state) => state.teamMembersSlice);
  const { registrationError, token } = useSelector((state) => state.registeredUsersSlice);
  const history = useHistory();
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [message, setMessage] = useState({
    successful: undefined,
    message: '',
  });
  const [serverError, setServerError] = useState('');
  const [loggedin, setLoggedin] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  console.log('registeredUsers', registeredUsers);
  // console.log('token', token)

  useEffect(() => {
    dispatch(getMembers());
    checkToken();
  }, []);

  // function handleRegistration(mail, password) {
  //  dispatch(register({mail, password}))
  //  if (registrationError) {
  //    setIsInfoTooltipOpen(true);
  //    setMessage({
  //      successful: false,
  //      message: "Что-то пошло не так! Попробуйте ещё раз.",
  //    });
  //  } else {
  //
  //    setIsInfoTooltipOpen(true);
  //    setMessage({
  //      successful: true,
  //      message: "Вы успешно зарегистрировались!",
  //    });
  //    history.push('/login')
  //    localStorage.setItem('regPw', password)
  //    localStorage.setItem('regMail', mail)
  //    localStorage.removeItem('registeredUsers')
  //    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers))
  //  }
  // }

  function handleRegistration(mail, password) {
    register(mail, password)
      .then((res) => {
        if (res.data.token) {
          setRegisteredUsers([...registeredUsers, { mail, password }]);
          setIsInfoTooltipOpen(true);
          setMessage({
            successful: true,
            message: 'Вы успешно зарегистрировались!',
          });
          // localStorage.removeItem('registeredUsers')
          history.push('/login');
          // localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers))
        }
      })
      .catch((err) => {
        setServerError(error.request.response);
        setIsInfoTooltipOpen(true);
        setMessage({
          successful: false,
          message: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
      });
  }

  function handleLogin(mail, password) {
    if (registeredUsers.length !== 0) {
      // const registeredUsersList = JSON.parse(localStorage.getItem('registeredUsers'))
      const result = registeredUsers.find((user) => user.mail === mail
      && user.password === password);
      const pwIncorrect = registeredUsers.find((user) => user.mail === mail
      && user.password !== password);
      const mailIncorrect = registeredUsers.find((user) => user.mail !== mail
      && user.password === password);
      if (result) {
        login(mail, password)
          .then((res) => {
            console.log(res.data);
            if (res.data.token) {
              localStorage.setItem('jwt', res.data.token);
              setLoggedin(true);
              history.push('/');
            } else {
              setLoggedin(false);
              history.push('/login');
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (pwIncorrect) {
        setIsInfoTooltipOpen(true);
        setMessage({
          successful: false,
          message: 'Неправильные логин или пароль',
        });
      } else if (mailIncorrect) {
        setIsInfoTooltipOpen(true);
        setMessage({
          successful: false,
          message: 'Неправильные логин или пароль',
        });
      } else {
        setIsInfoTooltipOpen(true);
        setMessage({
          successful: false,
          message: 'Такой пользователь не зарегистрирован',
        });
      }
    } else {
      setIsInfoTooltipOpen(true);
      setMessage({
        successful: false,
        message: 'Такой пользователь не зарегистрирован',
      });
    }
  }

  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
  }

  function checkToken() {
    if (localStorage.getItem('jwt')) {
      setLoggedin(true);
      history.push('/');
    } else {
      setLoggedin(false);
    }
  }

  function logout() {
    setLoggedin(false);
    localStorage.clear('jwt');
    history.push('/login');
  }

  return (
    <div className="wrapper">
      <div className='root'>
        <Switch>
          <Route exact path='/registration'>
            <Registration handleRegistration={handleRegistration} serverError={serverError} />
          </Route>
          <Route exact path='/login'>
            <Login handleLogin={handleLogin} serverError={serverError} />
          </Route>

          <ProtectedRoute exact path='/' loggedin={loggedin}>
            <Route >
              <Header logout={logout} >
                <h1 className='header__title'>Наша команда</h1>
                <p className='header__subtitle'>
                  Это опытные специалисты, хорошо разбирающиеся во всех задачах,
                  которые ложатся на их плечи, и
                  умеющие находить выход из любых, даже самых сложных ситуаций.
                </p>
              </Header>
              <Main teamMembers={teamMembers} error={error}/>
            </Route>

          </ProtectedRoute>

          <ProtectedRoute exact path='/:id' loggedin={loggedin} >
            <Route >
              <MemberPage />
            </Route>
          </ProtectedRoute>

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
