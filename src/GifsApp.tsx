import { mockGifs } from './mock-data/gifs.mock';
import { CustomHeader } from './shared/components/CustomHeader';
import { SearchBar } from './shared/components/SearchBar';
import { PreviousSearches } from './gifs/PreviousSearches';
import { GifList } from './gifs/GifList';
import { useState } from 'react';
import { getGifsByQuery } from './gifs/actions/get-gifs-by-query.actions';
import type { Gif } from './gifs/interfaces/gif.interface';



export const GifsApp = () => {
    const [previousTerms, setPreviousTerms] = useState<string[]>([]);
    const [gifList, setGifList] = useState<Gif[]>(mockGifs);

    const handleTermCliked = (term: string) => {
        console.log({ term });

    };
    const handleSearch = async (query: string) => {
        query = query.trim().toLocaleLowerCase();
        if (query.length === 0) return;
        if (previousTerms.includes(query)) return;
        setPreviousTerms([query, ...previousTerms].splice(0, 8));
        const gifs = await getGifsByQuery(query);
        setGifList(gifs);
    };

    return (
        <>
            <CustomHeader title="Buscador de Gifs" description="Descubre y comparte el gif perfecto" />
            <SearchBar
                placeholder='Buscar gifs'
                nameButton='Buscar'
                onQuery={handleSearch}
            />
            <PreviousSearches title="Búsquedas previas" searches={previousTerms} onLabelClicked={handleTermCliked} />
            <GifList gifs={gifList} />


        </>
    )
}
