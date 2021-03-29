import React, {useEffect, useCallback, useMemo} from "react";

import apiData from "./api";
import PersonInfo from "./PersonInfo";

import {PersonData} from "./types";

function App() {
    const [data, setData] = React.useState<PersonData[]>([]);
    const [selected, setSelected] = React.useState([]);
    const [isLoader, setIsLoader] = React.useState(false);
    const [isError, setIsError] = React.useState(false);

    const fetchData = useCallback(async (mergeResults?: boolean) => {
        setIsLoader(true);
        setIsError(false);

        try {
            const fetchedData = await apiData();

            setIsLoader(false);

            mergeResults ? setData(prevState => [...prevState, ...fetchedData]) : setData(fetchedData)
        } catch {
            setIsLoader(false);
            setIsError(true);
        }
    }, []);

    const buttonPart = useMemo(() => <button className="button" onClick={() => fetchData(true)}>Load
        more</button>, [fetchData]);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="App">
            {(isLoader || isError) &&
            (<div className="overlay">
                {isLoader && <div className="loader"/>}
                {isError && (
                    <div className="error-container">
                        <div>Oops, something went wrong, please try again :)</div>
                        {buttonPart}
                    </div>
                )}
            </div>)
            }
            <div className="selected">Selected contacts: {selected.length}</div>
            <div className="list">
                {data.map((personInfo) => (
                    // @ts-ignore
                    <PersonInfo key={personInfo.id} data={personInfo}/>
                ))}
                {!!data.length && buttonPart}
            </div>
        </div>
    );
}

export default App;
