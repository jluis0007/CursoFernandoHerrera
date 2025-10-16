import { CustomHeader } from './shared/components/CustomHeader';
import { SearchBar } from './shared/components/SearchBar';
import { PreviousSearches } from './gifs/PreviousSearches';
import { GifList } from './gifs/GifList';
import { useGifs } from './gifs/hooks/useGifs';
//import { mockGifs } from './mock-data/gifs.mock';

export const GifsApp = () => {
    const{ handleSearch, previousTerms, handleTermCliked, gifList} = useGifs( );

    return (
        <>
            <CustomHeader title="Buscador de Gifs" description="Descubre y comparte el gif perfecto" />
            <SearchBar
                placeholder='Buscar gifs'
                onQuery={handleSearch}
            />
            <PreviousSearches title="Búsquedas previas" searches={previousTerms} onLabelClicked={handleTermCliked} />
            <GifList gifs={gifList} />


        </>
    )
}
