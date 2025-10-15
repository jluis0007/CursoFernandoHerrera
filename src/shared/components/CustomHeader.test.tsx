import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CustomHeader } from './CustomHeader';
//import { text } from 'stream/consumers';

describe('CustomHeader', () => {
    const title = 'Buscador de Gifs';


    test('Should render the title correctlty', () => {
        //! Act
        render(<CustomHeader title={title} />);

        //! Assert
        expect(screen.getByText(title)).toBeDefined();
    });


    test('Should render the description when provider', () => {
        //! Arrange
        const description = 'Descubre y comparte el gif perfecto';

        //! Act
        render(<CustomHeader title={title} description={description} />);

        //! Assert
        expect(screen.getByText(description)).not.toBeNull();
        expect(screen.getByRole('paragraph')).toBeDefined();
        expect(screen.getByRole('paragraph').innerHTML).toBe(description);
    });


    test('Should not render description when not provider', () => {

        //! Act
        const { container } = render(<CustomHeader title={title} />);

        //! Assert       
        expect(container).not.contain(<p />);

        //solucion de Fernando
        const divElement = container.querySelector('.content-center');
        const h1 = divElement?.querySelector('h1');
        expect(h1?.innerHTML).toBe(title);
        const p = divElement?.querySelector('p');
        expect(p).toBeNull();

    });
});