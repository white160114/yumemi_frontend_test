import axios from "axios";

export const fetchPrefectures = async () => {
    const response = await axios.get('https://yumemi-frontend-engineer-codecheck-api.vercel.app', {
        headers: { 'X-API-KEY': '8FzX5qLmN3wRtKjH7vCyP9bGdEaU4sYpT6cMfZnJ' }
    });
    return response.data.result;
};

export const fetchPopulation = async (prefCode: number) => {
    const response = await axios.get(
    `https://yumemi-frontend-engineer-codecheck-api.vercel.app=${prefCode}`,
    {
        headers: { 'X-API-KEY': '8FzX5qLmN3wRtKjH7vCyP9bGdEaU4sYpT6cMfZnJ' }
    }
    );
    return response.data.result.data;
};

