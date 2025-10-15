import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useCounter } from './useCounter';

describe('useCounter', () => {
    //para eliminar la linea que se repite en cada test: const { result } = renderHook(() => useCounter());
    /*
    let result;
    beforeEach(() => {
       const { result: hookValue } = renderHook(() => useCounteer());
       result = hookValue; 
    }); 
     */

    test('Should initialize with default value of 10', () => {
        const { result } = renderHook(() => useCounter());
        expect(result.current.counter).toBe(10);
    });


    test('Should initialize with value 20', () => {
        const initialValue = 20;
        const { result } = renderHook(() => useCounter(initialValue));
        expect(result.current.counter).toBe(initialValue);
    });


    test('Should increment counter when handleAdd is called', () => {
        const { result } = renderHook(() => useCounter());

        act(() => {
            result.current.handleAdd();
        });
        expect(result.current.counter).toBe(11);
    });


    test('Should decrement counter when handleSubtract is called', () => {
        const { result } = renderHook(() => useCounter());

        act(() => {
            result.current.handleSubtract();
        });
        expect(result.current.counter).toBe(9);
    });


    test('Should reset counter when handleReset is called', () => {
        const { result } = renderHook(() => useCounter());

        act(() => {
            result.current.handleReset();
        });
        expect(result.current.counter).toBe(10);
    });


    test('Should reset counter when handleReset is called with initialValue of 20', () => {
        const { result } = renderHook(() => useCounter(20));

        act(() => {
            result.current.handleSubtract();
            result.current.handleSubtract();
        });
        expect(result.current.counter).toBe(18);
        act(() => {
            result.current.handleReset();
        });
        expect(result.current.counter).toBe(20);
    });
});