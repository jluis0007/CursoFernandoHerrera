import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
//import { useCounter } from '../hooks/useCounter';
import { MyCounterApp } from './MyCounterApp';


const handleAddMock = vi.fn();
const handleSubtractMock = vi.fn();
const handleResetMock = vi.fn();


vi.mock('../hooks/useCounter', () => ({
    useCounter: () => ({
        counter: 20,
        handleAdd: handleAddMock,
        handleSubtract: handleSubtractMock,
        handleReset: handleResetMock,

    })
}));

describe('MyCounterApp', () => {
    test('Should render the component', () => {
        render(<MyCounterApp />);
        screen.debug();

        expect(screen.getByRole('heading', { level: 1 }).innerHTML).toContain(
            `counter: 20`
        );

        expect(screen.getByRole('button', { name: '+1' })).toBeDefined();
        expect(screen.getByRole('button', { name: '-1' })).toBeDefined();
        expect(screen.getByRole('button', { name: 'Reset' })).toBeDefined();
    });

    test('Should call handleAddMock if button is clicked', () => {
        render(<MyCounterApp />);
        const button = screen.getByRole('button', { name: '+1' });
        fireEvent.click(button);
        expect(handleAddMock).toHaveBeenCalled();
        expect(handleAddMock).toHaveBeenCalledTimes(1);
        expect(handleSubtractMock).not.toHaveBeenCalled();
        expect(handleResetMock).not.toHaveBeenCalled();
    });
    test('Should call handleSubtractMock if button is clicked', () => {
        render(<MyCounterApp />);
        const button = screen.getByRole('button', { name: '-1' });
        fireEvent.click(button);
        expect(handleSubtractMock).toHaveBeenCalled();
        expect(handleSubtractMock).toHaveBeenCalledTimes(1);
        //expect(handleAddMock).not.toHaveBeenCalled();
        expect(handleResetMock).not.toHaveBeenCalled();
    });
    test('Should call handleResetMock if button is clicked', () => {
        render(<MyCounterApp />);
        const button = screen.getByRole('button', { name: 'Reset' });
        fireEvent.click(button);
        expect(handleResetMock).toHaveBeenCalled();
        expect(handleResetMock).toHaveBeenCalledTimes(1);
        //expect(handleSubtractMock).not.toHaveBeenCalled();
        //expect(handleAddMock).not.toHaveBeenCalled();
    });







});
