import React, {useEffect, useCallback} from "react";

import apiData from "./api";
import PersonInfo from "./PersonInfo";

import {PersonData} from "./types";

function App() {
    const [data, setData] = React.useState<PersonData[]>([]);
    const [selected, setSelected] = React.useState([]);

    const fetchData = useCallback(async () => {
        try {
            const fetchedData = await apiData();

            setData(fetchedData)
        } catch {

        }
    }, []);

    useEffect(() => {
        fetchData();
    });

    //  TODO fetch contacts using apiData function, handle loading and error states

    return (
        <div className="App">
            <div className="selected">Selected contacts: {selected.length}</div>
            <div className="list">
                {data.map((personInfo) => (
                    // @ts-ignore
                    <PersonInfo key={personInfo.id} data={personInfo}/>
                ))}
            </div>
        </div>
    );
}

export default App;
