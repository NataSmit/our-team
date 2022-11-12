import React from 'react';
import MemberCard from '../MemberCard/MemberCard';
import { useHistory } from 'react-router-dom';

export default function Main({teamMembers, error}) {
  const history = useHistory()
  
  function openMemberPage(id) {
    history.push(`/${id}`)
  }

  return (
    <main className='main'>
      <div className='main__container'>
       {error && <p>На сервере произошла ошибка</p>}
      {
          teamMembers.map((member) => (
            <MemberCard member={member} key={member.id} openMemberPage={() => openMemberPage(member.id)}/>
          ))
        }
      </div>
      <button className='main__more-btn'>Показать еще</button>
    </main>
  )
}
