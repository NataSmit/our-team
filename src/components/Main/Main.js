/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getMembersSecondPage } from "../../store/teamMembersSlice";
import MemberCard from "../MemberCard/MemberCard";

export default function Main({ teamMembers, error }) {
  console.log("error", error);
  const history = useHistory();
  const [numberToDisplay, setNumberToDisplay] = useState(8);

  function openMemberPage(id) {
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
