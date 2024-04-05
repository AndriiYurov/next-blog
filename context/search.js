"use client";
import { createContext, useState, useContext } from "react";
import { useRouter } from "next/navigation";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const router = useRouter();

  const fetchSearchResult = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/search?searchQuery=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error("Failde to fetch search result");
      }
      const data = await response.json();
      // console.log("search result =>", data);
      router.push(`/search?searchQuery=${searchQuery}`);
      setSearchResult(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResult,
        setSearchResult,
        fetchSearchResult,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
