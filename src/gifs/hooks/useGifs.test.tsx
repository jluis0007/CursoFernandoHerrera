import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useGifs } from './useGifs';
import * as gifsActions from '../actions/get-gifs-by-query.actions';


describe('useGifs', () => {

    test('Shold return defaults values and methods', () => {
        const { result } = renderHook(() => useGifs(  ));
        expect(result.current.gifList.length).toBe(0);
        expect(result.current.handleSearch).toBeDefined();
        expect(result.current.handleTermCliked).toBeDefined();
    });

    test('Shold return a list of gifs', async() => {
        const { result } = renderHook(() => useGifs( ));
        await act(async() => {
            await result.current.handleSearch('goku');            
        });

        expect(result.current.gifList.length).toBe(10);
    });
    
    test('Shold return a list of gifs when handleTermCliked is called', async() => {
        const { result } = renderHook(() => useGifs( ));
        await act(async() => {
            await result.current.handleTermCliked('goku');            
        });

        expect(result.current.gifList.length).toBe(10);
    });

    test('Shold return a list of gifs from cache', async() => {
        const { result } = renderHook(() => useGifs( ));
        await act(async() => {
            await result.current.handleTermCliked('goku');            
        });
        vi.spyOn(gifsActions,'getGifsByQuery')
        .mockRejectedValue(new Error('This is my custom error'));
        await act(async() => {
            await result.current.handleTermCliked('goku');            
        });

        expect(result.current.gifList.length).toBe(10);
    });
    
    test('Shold return no more than 8 previuos Terms', async() => {
        const { result } = renderHook(() => useGifs( ));
        vi.spyOn(gifsActions,'getGifsByQuery')
        .mockResolvedValue([]);
        await act(async() => {
            await result.current.handleSearch('goku1');            
        });
        await act(async() => {
            await result.current.handleSearch('goku2');            
        });
        await act(async() => {
            await result.current.handleSearch('goku3');            
        });
        await act(async() => {
            await result.current.handleSearch('goku4');            
        });
        await act(async() => {
            await result.current.handleSearch('goku5');            
        });
        await act(async() => {
            await result.current.handleSearch('goku6');            
        });
        await act(async() => {
            await result.current.handleSearch('goku7');            
        });
        await act(async() => {
            await result.current.handleSearch('goku8');            
        });
        await act(async() => {
            await result.current.handleSearch('goku9');            
        });
        console.log(result.current.previousTerms);
        expect(result.current.previousTerms.length).toBe(8);
        expect(result.current.previousTerms).toStrictEqual(
            [
                'goku9', 'goku8',
                'goku7', 'goku6',
                'goku5', 'goku4',
                'goku3', 'goku2'
            ]
        );
    });


});