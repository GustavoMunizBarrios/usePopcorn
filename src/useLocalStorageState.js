import { useState, useEffect } from "react"

export function useLocalStorageState(initialState, key) {
    //React call the function on the initial render and it'll use
    // whatever value is returned from this function as the initial
    // value of the state.
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key);
        //if there is no value in local storage, return initialState, otherwise return the value in local storage
        return storedValue === null ? initialState : JSON.parse(storedValue);

    });
    // console.log(`Esto es localStorage.getItem("watched"): ${localStorage.getItem("watched")}`);

    //video 163
    //LOCAL STORAGE (maintains data storage even when page is reloaded)
    useEffect(
        function () {
            localStorage.setItem(key, JSON.stringify(value));
        },
        [value, key]
    );
    return [value, setValue];
}