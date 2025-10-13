import { useRef, useState } from "react";
import { getGifsByQuery } from "../actions/get-gifs-by-query.actions";
import type { Gif } from "../interfaces/gif.interface"; 

//const gifsCache: Record<string, Gif[]> = {};

export const useGifs = (mockGifs: Gif[]) => {
    const [gifList, setGifList] = useState<Gif[]>(mockGifs);
    const [previousTerms, setPreviousTerms] = useState<string[]>([]);

const gifsCache = useRef<Record<string, Gif[]>> ({});

    const handleTermCliked = async(term: string) => {
        if (gifsCache.current[term]){
            setGifList(gifsCache.current[term]);
            return;
        };
        /* const gifs = await getGifsByQuery(term);
        setGifList(gifs); */

    };
    const handleSearch = async (query: string) => {
        query = query.trim().toLocaleLowerCase();
        if (query.length === 0) return;
        if (previousTerms.includes(query)) return;
        setPreviousTerms([query, ...previousTerms].splice(0, 8));
        const gifs = await getGifsByQuery(query);
        setGifList(gifs);
        gifsCache.current[query]=gifs;
    };
    return {
        //Propierties
        gifList,
        //Methods
        handleSearch, 
        handleTermCliked, 
        previousTerms, 
    }
}