import React from 'react';
import MemberCard from '../MemberCard/MemberCard';

export default function Main({teamMembers}) {
  return (
    <main className='main'>
      <div className='main__container'>
      {
          teamMembers.map((member) => (
            <MemberCard member={member} key={member.id} />
          ))
        }
      </div>
      <button className='main__more-btn'>Показать еще</button>
    </main>
  )
}
