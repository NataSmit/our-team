import React, { useEffect, useState } from 'react';
import MemberCard from '../MemberCard/MemberCard';
import { useHistory } from 'react-router-dom';
import {getMembersSecondPage} from '../../store/teamMembersSlice';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

export default function Main({teamMembers, error}) {
  const history = useHistory();
  const dispatch = useDispatch()
  const teamMembersSecondPage = useSelector((state) => state.teamMembersSlice.teamMembersSecondPage)
  const [moreBtnClicked, setMoreBtnClicked] = useState(false)
  const finalListToDisplay = moreBtnClicked ? [...teamMembers, ...teamMembersSecondPage] : teamMembers
 
  function openMemberPage(id) {
    history.push(`/${id}`)
  }

 function handleMoreBtn() {
  setMoreBtnClicked(true)
   console.log('clicked')
 }

  useEffect(() => {
    dispatch(getMembersSecondPage())
  }, [])

  

  return (
    <main className='main'>
      <ul className='main__container'>
       {error && <p>На сервере произошла ошибка</p>}
       {
          finalListToDisplay.map((member) => (
            <MemberCard member={member} key={member.id} openMemberPage={() => openMemberPage(member.id)}/>
          ))
        }
      </ul>
      <button className='main__more-btn' onClick={handleMoreBtn}>Показать еще</button>
    </main>
  )
}
