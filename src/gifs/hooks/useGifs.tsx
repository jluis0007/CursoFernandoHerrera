import { useRef, useState } from "react";
import { getGifsByQuery } from "../actions/get-gifs-by-query.actions";
import type { Gif } from "../interfaces/gif.interface"; 

//const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
    const [gifList, setGifList] = useState<Gif[]>([]);
    const [previousTerms, setPreviousTerms] = useState<string[]>([]);

const gifsCache = useRef<Record<string, Gif[]>> ({});

    const handleTermCliked = async(term: string) => {
        if (gifsCache.current[term]){
            setGifList(gifsCache.current[term]);
            return;
        };
        const gifs = await getGifsByQuery(term);
        setGifList(gifs);
        gifsCache.current[term]=gifs;
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
        previousTerms, 
        
        //Methods
        handleSearch, 
        handleTermCliked, 
    }
}