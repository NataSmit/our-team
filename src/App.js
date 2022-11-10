import './App.css';
import axios from 'axios';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addMembers} from './store/teamMembersSlice';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import MemberPage from './components/MemberPage/MemberPage';
import {Route, Switch} from 'react-router-dom';
import Registration from './components/Registration/Registration'


function App() {
const dispatch = useDispatch()
const teamMembers = useSelector( (state) => state.teamMembersSlice.teamMembers)

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

 
  
  return (
    <div className="wrapper">
      <div className='root'>
        <Switch>
          <Route exact path='/registration'>
              <Registration />
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
    </div>
  );
}

export default App;
