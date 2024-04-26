import { useEffect } from "react";

//Custom hook for closing MovieDetails with ESC key

export function useKey(key, action) {
    //Close MovieDetails with ESC key
    useEffect(
        function () {
            function callback(e) {
                if (e.code.toLowerCase() === key.toLowerCase()) { // toLowerCase() to avoid case sensitive
                    action();
                }
            }
            document.addEventListener("keydown", callback);

            return function () {
                document.removeEventListener("keydown", callback);
            };
        },
        [action, key]
    );
}