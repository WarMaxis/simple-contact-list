import React from "react";

import {PersonData} from "./types";

type Props = {
    data: PersonData;
    selected?: boolean;
    onCardClick: (id: string, selected?: boolean) => void;
};

const PersonInfo = React.memo((props: Props) => {
    const {data, selected, onCardClick} = props;

    return (
        <div className={`person-info ${selected ? 'person-info--selected' : ''}`}
             onClick={() => onCardClick(data.id, selected)}>
            <div className="firstNameLastName">{data.firstNameLastName}</div>
            <div className="jobTitle">{data.jobTitle}</div>
            <div className="emailAddress">{data.emailAddress}</div>
        </div>
    );
});

export default PersonInfo;
