import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Header from "../Header/Header";
import { getMemberById } from "../../store/teamMembersSlice";
import {useAppSelector, useAppDispatch} from '../../types/reduxHooks';
import { HeaderProps } from "../Header/Header";

type MemberPageProps = Omit<HeaderProps, 'children'>

export default function MemberPage({ member, logout }: MemberPageProps) {
  type Params = {
    id: string
  }
  const dispatch = useAppDispatch();
  const memberById = useAppSelector((state) => state.teamMembersSlice.memberById);
  const history = useHistory();
  const params = useParams<Params>();
  console.log("memberById", memberById);

  useEffect(() => {
    dispatch(getMemberById(params.id));
  }, []);

  function goBack() {
    history.goBack();
  }

  return (
    <section className="member-page">
      <Header member={true} logout={logout}>
        <div className="member-page__container">
          <div className="member-page__body">
            <div className="member-page__photo-container">
              <img
                className="member-page__photo"
                src={memberById.avatar}
                alt={`Фото ${memberById.first_name} ${memberById.last_name}`}
              />
            </div>
            <div className="member-page__info">
              <h1 className="member-page__title">{`${
                memberById.first_name || ""
              }  ${memberById.last_name || ""}`}</h1>
              <p className="member-page__subtitle">Партнер</p>
            </div>
          </div>
        </div>
        <button
          className="header__button header_button_type_back"
          onClick={goBack}
        >
          Назад
        </button>
        <button className="header__back-btn-small" onClick={goBack}></button>
      </Header>
      <div className="member-page__resume">
        <div className="member-page__description">
          <p className="member-page__text">
            Клиенты видят в нем эксперта по вопросам разработки комплексных
            решений финансовых продуктов, включая такие аспекты, как
            организационная структура, процессы, аналитика и ИТ-компоненты. Он
            помогает клиентам лучше понимать структуру рисков их бизнеса,
            улучшать процессы за счет применения новейших технологий и
            увеличивать продажи, используя самые современные аналитические
            инструменты.
          </p>
          <p className="member-page__text">
            В работе с клиентами недостаточно просто решить конкретную проблему
            или помочь справиться с трудностями. Не менее важно уделять внимание
            обмену знаниями: "Один из самых позитивных моментов — это осознание
            того, что ты помог клиенту перейти на совершенно новый уровень
            компетентности, уверенность в том, что после окончания проекта у
            клиента есть все необходимое, чтобы дальше развиваться
            самостоятельно".
          </p>
          <p className="member-page__text">
            Помимо разнообразных проектов для клиентов финансового сектора,
            Сорин ведет активную предпринимательскую деятельность. Он является
            совладельцем сети клиник эстетической медицины в Швейцарии,
            предлагающей инновационный подход к красоте, а также инвестором
            других бизнес-проектов.
          </p>
        </div>
        <div className="member-page__contacts">
          <a className="member-page__tel" href="tel:+74951111111">
            +7 (495) 111-11-11
          </a>
          <a className="member-page__mail" href={`mailto:${memberById.email}`}>
            {memberById.email}
          </a>
        </div>
      </div>
    </section>
  );
}
