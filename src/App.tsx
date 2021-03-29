import React, {useEffect, useCallback} from "react";

import apiData from "./api";
import PersonInfo from "./PersonInfo";

import {PersonData} from "./types";

function App() {
    const [data, setData] = React.useState<PersonData[]>([]);
    const [selected, setSelected] = React.useState([]);
    const [isLoader, setLoader] = React.useState(false);

    const fetchData = useCallback(async (mergeResults?: boolean) => {
        setLoader(true);

        try {
            const fetchedData = await apiData();

            setLoader(false);

            mergeResults ? setData(prevState => [...prevState, ...fetchedData]) : setData(fetchedData)
        } catch {
            setLoader(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="App">
            {isLoader &&
            (<div className="overlay">
                <div className="loader"/>
            </div>)
            }
            <div className="selected">Selected contacts: {selected.length}</div>
            <div className="list">
                {data.map((personInfo) => (
                    // @ts-ignore
                    <PersonInfo key={personInfo.id} data={personInfo}/>
                ))}
                {!!data.length && <button className="button" onClick={() => fetchData(true)}>Load more</button>}
            </div>
        </div>
    );
}

export default App;
