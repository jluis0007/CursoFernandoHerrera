
import { beforeEach, describe, expect, test, vi } from 'vitest';
import AxiosMockAdapter from 'axios-mock-adapter';
import { getGifsByQuery } from './get-gifs-by-query.actions';
import { giphyApi } from '../api/giphy.api';
import { giphySearchResponseMock } from '../../tests/mock/giphy.response.data';
//import { beforeEach } from 'node:test';


describe('getGifsByQuery', () => {
    let mock = new AxiosMockAdapter(giphyApi);

    beforeEach(() => {
        mock = new AxiosMockAdapter(giphyApi);

    });

    test('Should return a list of gifs', async () => {
        mock.onGet('/search').reply(200, giphySearchResponseMock);
        const gifs = await getGifsByQuery('goku');
        //console.log(gifs);
        expect(gifs.length).toBe(25);
        gifs.forEach(gif => {
            expect(typeof gif.id).toBe('string');
            expect(typeof gif.title).toBe('string');
            expect(typeof gif.url).toBe('string');
            expect(typeof gif.width).toBe('number');
            expect(typeof gif.height).toBe('number');
        });
    });
    test('Should return an empty list of gifs if query is empty', async () => {
        //mock.onGet('/search').reply(200, { data: [] });
        mock.restore();
        const gifs = await getGifsByQuery('');
        expect(gifs.length).toBe(0);

    });
    test('Should return error when the API returs an error', async () => {

        const consoleErrorSpy = vi.spyOn(console, 'error')
            .mockImplementation(() => { console.log('puedo poner cualquier cosa que se necesite en lugar del error, sustituye') });

        mock.onGet('/search').reply(400, {
            data: {
                message: 'Bad request',
            },
        });
        const gifs = await getGifsByQuery('goku');


        expect(gifs.length).toBe(0);
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalled();
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything());
    });
    /* test('Should return a list of gifs', async () => {
        const gifs = await getGifsByQuery('goku');
        const [gif1] = gifs;
        expect(gifs.length).toBe(10);
        expect(gif1).toStrictEqual({
            id: expect.any(String),
            title: expect.any(String),
            url: expect.any(String),
            height: expect.any(Number),
            width: expect.any(Number),
        });
    }); */




});
