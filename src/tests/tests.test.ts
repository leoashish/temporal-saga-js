import { apiCallActivity } from '../activities/apiCalls';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const EXTERNAL_API_URL = 'http://fake-url.com';

describe('apiCallActivity', () => {
    const oldEnv = process.env;

    beforeEach(() => {
        jest.clearAllMocks();
        process.env = { ...oldEnv, EXTERNAL_API_URL };
    });

    afterAll(() => {
        process.env = oldEnv;
    });

    it('should throw if POST fails', async () => {
        mockedAxios.post.mockRejectedValue(new Error('POST failed'));

        await expect(apiCallActivity()).rejects.toThrow('POST failed');
    });

    it('should throw if first GET fails', async () => {
        mockedAxios.post.mockResolvedValue({ data: { id: 1 } });
        mockedAxios.get.mockRejectedValueOnce(new Error('GET1 failed'));

        await expect(apiCallActivity()).rejects.toThrow('GET1 failed');
    });

    it('should throw if second GET fails', async () => {
        mockedAxios.post.mockResolvedValue({ data: { id: 1 } });
        mockedAxios.get
            .mockResolvedValueOnce({ data: [{ id: 42 }] }) // first GET
            .mockRejectedValueOnce(new Error('GET2 failed')); // second GET

        await expect(apiCallActivity()).rejects.toThrow('GET2 failed');
    });

    it('should throw if EXTERNAL_API_URL is not set', async () => {
        process.env.EXTERNAL_API_URL = '';
        await expect(apiCallActivity()).rejects.toThrow();
    });
});