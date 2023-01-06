import React from "react";
import {Member} from '../../types/member'

interface MemberCardProps {
  member: Member,
  openMemberPage: (e: React.MouseEvent<HTMLLIElement>) => void
}

export default function MemberCard({ member, openMemberPage }: MemberCardProps) {
  return (
    <li className="member-card" onClick={openMemberPage}>
      <div className="member-card__container">
        <div className="member-card__photo-container">
          <img
            className="member-card__photo"
            src={member.avatar}
            alt={`Фото ${member.first_name} ${member.last_name}`}
          />
        </div>
        <h1 className="member-card__title">{`${member.first_name} ${member.last_name}`}</h1>
        <div className="member-card__button-container">
          <button className="member-card__button"></button>
        </div>
      </div>
    </li>
  );
}
