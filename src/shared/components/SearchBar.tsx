import { useState, type KeyboardEvent, useEffect } from 'react';
interface Props {
    placeholder?: string;
    //nameButton: string;
    onQuery: (query: string) => void;
}

export const SearchBar = ({ placeholder = "Buscar", onQuery }: Props) => {
    const [query, setQuery] = useState('');


    useEffect(() => {
        const timeOutId = setTimeout(() => {
            onQuery(query);
        }, 800)
        return () => {
            clearTimeout(timeOutId);
        };
    }, [query, onQuery]);


    const handleSearch = () => {
        if (query !== '') {
            onQuery(query);
        };
        setQuery('');
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }

    }
    return (
        <div className='search-container'>{/* Search */}
            <input
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleKeyDown}
            >

            </input>
            <button
                onClick={handleSearch}
            >Buscar</button>
        </div >
    )
}
