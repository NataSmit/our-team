import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MemberCard from "../MemberCard/MemberCard";
import { useAppSelector, useAppDispatch } from "../../types/reduxHooks";
import { getMembers } from "../../store/teamMembersSlice";
import { useCurrentWidth } from "../../hooks/useCurrentWidth";

export default function Main() {
  const dispatch = useAppDispatch();
  const teamMembers = useAppSelector(
    (state) => state.teamMembersSlice.serverData.data
  );
  const totalNumberOfServerCards = useAppSelector(
    (state) => state.teamMembersSlice.serverData.total
  );

  const history = useHistory();
  const { error } = useAppSelector((state) => state.teamMembersSlice);
  console.log('error', error)
  const [initialNumberOfCards, setInitialNumberOfCards] = useState(8);
  const [cardsToAdd, setCardsToAdd] = useState(4);
  const [numberOfCardsAfterMoreBtn, setNumberOfCardsAfterMoreBtn] =
    useState(initialNumberOfCards);
  const windowWidth = useCurrentWidth();

  //в запросе указывается нужное к-во карточек в зависимости от размера экрана

  useEffect(() => {
    dispatch(getMembers(initialNumberOfCards));
    setNumberOfCardsAfterMoreBtn(initialNumberOfCards);
  }, [initialNumberOfCards, dispatch]);

  useEffect(() => {
    setInitialNumberOfCards(initialNumberOfCards);
    if (windowWidth >= 1281) {
      setInitialNumberOfCards(8);
    } else if (windowWidth >= 630 && windowWidth <= 1280) {
      setInitialNumberOfCards(6);
    } else {
      setInitialNumberOfCards(4);
    }
  }, [windowWidth, initialNumberOfCards]);

  //при нажатии на кнопку "Ещё" добаляется разное к-во карточек в зависимости от
  //размера экрана

  useEffect(() => {
    setCardsToAdd(cardsToAdd);
    if (windowWidth >= 1281) {
      setCardsToAdd(4);
    } else if (windowWidth >= 630 && windowWidth <= 1280) {
      setCardsToAdd(3);
    } else {
      setCardsToAdd(2);
    }
  }, [windowWidth, cardsToAdd]);

  useEffect(() => {
    dispatch(getMembers(numberOfCardsAfterMoreBtn));
  }, [numberOfCardsAfterMoreBtn, dispatch]);

  function openMemberPage(id: number) {
    history.push(`/${id}`);
  }

  function handleMoreBtn() {
    setNumberOfCardsAfterMoreBtn(numberOfCardsAfterMoreBtn + cardsToAdd);
  }

  return (
    <main className="main">
      <ul className="main__container">
        {error && <p>На сервере произошла ошибка</p>}
        {teamMembers.map((member) => (
          <MemberCard
            member={member}
            key={member.id}
            openMemberPage={() => openMemberPage(member.id)}
          />
        ))}
      </ul>
      {teamMembers.length < totalNumberOfServerCards && (
        <button className="main__more-btn" onClick={handleMoreBtn}>
          Показать еще
        </button>
      )}
    </main>
  );
}
