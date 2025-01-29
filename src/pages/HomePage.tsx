import { useState, useEffect } from 'react';
import PrefectureCheckboxList from '../components/CheckboxList';
import PopulationGraph from '../components/PopulationGraph';
import { fetchPopulation, fetchPrefectures } from '../api/api';
import '../styles/HomePage.css'; // CSSファイルをインポート

interface DataPoint {
    year: number;
    value: number;
}

interface GraphData {
    prefCode: number;
    data: DataPoint[];
}

interface Prefecture {
    prefCode: number;
    prefName: string;
}

const HomePage = () => {
    const [graphData, setGraphData] = useState<GraphData[]>([]);
    const [prefectures, setPrefectures] = useState<Prefecture[]>([]);

    useEffect(() => {
        const getPrefectures = async () => {
            const data = await fetchPrefectures();
            setPrefectures(data);
        };
        getPrefectures();
    }, []);

    const handlePrefectureSelection = async (selectedPrefCodes: number[]) => {
        if (selectedPrefCodes.length === 0) {
            setGraphData([]);
            return;
        }

        const promises = selectedPrefCodes.map((prefCode) => fetchPopulation(prefCode).then((result) => ({
            prefCode,
            data: result.result.data.flatMap((dataItem: any) => {
                if (dataItem.label === "総人口" && Array.isArray(dataItem.data)) {
                    return dataItem.data.map((item: any) => ({
                        year: item.year,
                        value: item.value,
                    }));
                }
                return [];
            }),
        })));

        const results = await Promise.all(promises);

        console.log('Combined Data:', results); // デバッグ用に処理後のデータをログ出力

        setGraphData(results);
    };

    return (
        <div className="homepage">
            <header className="homepage-header">
                <h1>ゆめみフロントエンドコーディング試験</h1>
            </header>
            <div className="homepage-content">
                <PrefectureCheckboxList onSelect={handlePrefectureSelection} />
                <PopulationGraph data={graphData} prefectures={prefectures} />
            </div>
        </div>
    );
};

export default HomePage;