import axios from "axios";

const API_KEY = '8FzX5qLmN3wRtKjH7vCyP9bGdEaU4sYpT6cMfZnJ';
const BASE_URL = 'https://yumemi-frontend-engineer-codecheck-api.vercel.app';

export const fetchPrefectures = async () => {
    try{
        const response = await axios.get(`${BASE_URL}/api/v1/prefectures`, {
            headers: { 'X-API-KEY': API_KEY }
        });
        console.log('API Response:', response.data);
        return response.data.result;
    }catch (error){
        console.error('Error fetching prefectures:', error);
        return [];
    }
};

export const fetchPopulation = async (prefCode: number) => {
    const response = await axios.get(
    `${BASE_URL}/api/v1/population/composition/perYear`,
    {
        headers: { 'X-API-KEY': API_KEY }, // APIキーをリクエストヘッダーに設定
        params: { prefCode }, // クエリパラメータとして都道府県コードを送信
    }
    );
    return response.data; // APIのレスポンスデータを返却
};

