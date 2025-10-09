import type { FC } from "react";

interface Props {
    title: string;
    searches: string[];
    onLabelClicked: (term: string) => void;
}

export const PreviousSearches: FC<Props> = ({ title, searches, onLabelClicked }) => {
    console.log({ searches });
    return (
        <div className='previous-searches'> {/* Búsquedas previas */}
            <h2>{title}</h2>
            <ul className='previous-searches-list'>
                {
                    searches.map((term) => (
                        <div >
                            <li
                                key={term}
                                onClick={() => onLabelClicked(term)}>{term}
                            </li>
                        </div>
                    ))
                }
            </ul>
        </div>
    )
}
