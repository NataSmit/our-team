import './App.css';
import axios from 'axios';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addMembers} from './store/teamMembersSlice';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

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
        <Header />
        <Main teamMembers={teamMembers} />
      </div>
    </div>
  );
}

export default App;
