import React from "react";

import PersonInfo from "./PersonInfo";
import apiData from "./api";

import {PersonData} from "./types";

function App() {
    const [data, setData] = React.useState<PersonData[]>([]);
    const [selected, setSelected] = React.useState<string[]>([]);
    const [isLoader, setIsLoader] = React.useState(false);
    const [isError, setIsError] = React.useState(false);

    const fetchData = React.useCallback(async (mergeResults?: boolean) => {
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

    const handleSelect = React.useCallback((cardId: string, selected?: boolean) => {
        selected ? setSelected(prevState => prevState.filter(id => cardId !== id)) : setSelected(prevState => [...prevState, cardId])
    }, [])

    const buttonPart = React.useMemo(() => <button className="button" onClick={() => fetchData(true)}>Load
        more</button>, [fetchData]);

    React.useEffect(() => {
        fetchData();
    }, [fetchData]);

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
                {!!selected.length && <>
                    {data.filter(item => selected.includes(item.id)).map((personInfo) => (
                        <PersonInfo key={personInfo.id} data={personInfo} onCardClick={handleSelect} selected/>
                    ))}
                    <hr/>
                </>}

                {data.filter(item => !selected.includes(item.id)).map((personInfo) => (
                    <PersonInfo key={personInfo.id} data={personInfo} onCardClick={handleSelect}/>
                ))}

                {!!data.length && buttonPart}
            </div>
        </div>
    );
}

export default App;
