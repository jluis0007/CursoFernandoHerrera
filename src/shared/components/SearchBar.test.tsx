import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {


    test('Should render the searchBar correctlty', () => {
        //! Act
        const {container } = render(<SearchBar onQuery={() => {}} />);

        //! Assert
        expect(container).toMatchSnapshot();
        expect(screen.getByRole('textbox')).toBeDefined();
        expect(screen.getByRole('button')).toBeDefined();
    });
    
    test('Should call onQuery with the correct value after 800 ms', async() => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'test'}});
        await waitFor(() => {
            expect(onQuery).toHaveBeenCalled();
            expect(onQuery).toHaveBeenCalledWith('test');
        });
    });
    
    test('Should call only oncewith the last value (debounce)', async() => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />);
        
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 't'}});
        fireEvent.change(input, { target: { value: 'te'}});
        fireEvent.change(input, { target: { value: 'tes'}});
        fireEvent.change(input, { target: { value: 'test'}});
        await waitFor(() => {
            expect(onQuery).toHaveBeenCalledTimes(1);
            expect(onQuery).toHaveBeenCalledWith('test');
        });
    });

    test('Should call onQuery when button is clicked with the input value', async() => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'test'}});
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(onQuery).toHaveBeenCalledTimes(1);
        expect(onQuery).toHaveBeenCalledWith('test');
    });

    test('Should the input has the correct placeHolder value', () => {
        const value = 'Buscar Gif';
        render(<SearchBar onQuery={() => {}} placeholder={ value } />);

        expect(screen.getByPlaceholderText(value)).toBeDefined();

    });
});