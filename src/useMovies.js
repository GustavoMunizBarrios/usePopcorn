//CUSTOM HOOK FOR FETCHING MOVIES

import { useState, useEffect } from "react";

const KEY = "58249baa";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  //FETCHING MOVIES
  useEffect(
    function () {
      //If callback is passed, it will be called after the fetch is complete
      //callback?.();

      //Abort controller is a native browser API, we used for clean up function
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true); // this indicate that loading is still happened
          setError(""); // reset Error
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error("Movie not found");
          }
          setMovies(data.Search);
        } catch (err) {
          //this ignore AbortError
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
          if (err.message === "Failed to fetch")
            setError("Something went wrong with fetching movies");
          else {
            setError(err.message);
          }
        } finally {
          setIsLoading(false); // this indicate that loading is complete
        }
      }

      if (query.length < 3) {
        // if there are less than 3 letters in"Search" then...
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
