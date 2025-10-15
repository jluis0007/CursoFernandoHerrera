import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { MyCounterApp } from './MyCounterApp';

describe('MyCounterApp', () => {
    //para eliminar la linea que se repite en cada test: const { result } = renderHook(() => useCounter());
    /*
    let result;
    beforeEach(() => {
       const { result: hookValue } = renderHook(() => useCounteer());
       result = hookValue; 
    }); 
     */

    test('Should render the component', () => {
        render(<MyCounterApp />);
        screen.debug();  // hacer esto siempre que empecemos para observar que se renderiza

        expect(screen.getByRole('heading', { level: 1 }).innerHTML).toContain(
            `counter: 10`
        );

        expect(screen.getByRole('button', { name: '+1' })).toBeDefined();
        expect(screen.getByRole('button', { name: '-1' })).toBeDefined();
        expect(screen.getByRole('button', { name: 'Reset' })).toBeDefined();
    });


    test('Should increment the counter', () => {
        render(<MyCounterApp />);

        const labelH1 = screen.getByRole('heading', { level: 1 });
        const button = screen.getByRole('button', { name: '+1' });

        fireEvent.click(button);
        expect(labelH1.innerHTML).toContain('counter: 11');
    });

    test('Should decrement the counter', () => {
        render(<MyCounterApp />);

        const labelH1 = screen.getByRole('heading', { level: 1 });
        const button = screen.getByRole('button', { name: '-1' });

        fireEvent.click(button);
        expect(labelH1.innerHTML).toContain('counter: 9');
    });
});



