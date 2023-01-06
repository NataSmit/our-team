/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import MemberCard from "../MemberCard/MemberCard";
import {useAppSelector} from '../../types/reduxHooks';

import {Member} from '../../types/member'

interface MainProps {
  teamMembers: Member[]
}

export default function Main({ teamMembers }: MainProps) {
 
  const history = useHistory();
  const [numberToDisplay, setNumberToDisplay] = useState(8);
  const { error } = useAppSelector((state) => state.teamMembersSlice);
  console.log("error", error);

  function openMemberPage(id: number) {
    history.push(`/${id}`);
  }

  function handleMoreBtn() {
    setNumberToDisplay(numberToDisplay + 8);
  }

  return (
    <main className="main">
      <ul className="main__container">
        {error && <p>На сервере произошла ошибка</p>}
        {teamMembers.slice(0, numberToDisplay).map((member) => (
          <MemberCard
            member={member}
            key={member.id}
            openMemberPage={() => openMemberPage(member.id)}
          />
        ))}
      </ul>
      {numberToDisplay > teamMembers.length ? (
        ""
      ) : (
        <button className="main__more-btn" onClick={handleMoreBtn}>
          Показать еще
        </button>
      )}
    </main>
  );
}
