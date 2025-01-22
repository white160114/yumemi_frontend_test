import axios from 'axios';

const BASE_URL = 'https://yumemi-frontend-engineer-codecheck-api.vercel.app';
const API_KEY = '8FzX5qLmN3wRtKjH7vCyP9bGdEaU4sYpT6cMfZnJ'; // 適切なAPIキーに置き換えてください

export const fetchPrefectures = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/prefectures`, {
            headers: { 'X-API-KEY': API_KEY },
        });
        return response.data.result; // APIのレスポンスデータを返却
    } catch (error) {
        console.error('Error fetching prefectures:', error);
        return [];
    }
};

export const fetchPopulation = async (prefCode: number) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/api/v1/population/composition/perYear`,
            {
                headers: { 'X-API-KEY': API_KEY }, // APIキーをリクエストヘッダーに設定
                params: { prefCode }, // クエリパラメータとして都道府県コードを送信
            }
        );
        console.log('API Response:', response.data); // デバッグ用にAPIレスポンスをログ出力
        return response.data; // APIのレスポンスデータを返却
    } catch (error) {
        console.error('Error fetching population:', error);
        return { result: { data: [] } }; // エラー時に空の結果を返却
    }
};