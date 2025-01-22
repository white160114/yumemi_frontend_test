import React, { useState } from 'react';
import PrefectureCheckboxList from '../components/CheckboxList';
import PopulationGraph from '../components/PopulationGraph';
import { fetchPopulation } from '../api/api';

const HomePage = () => {
    const [graphData, setGraphData] = useState<any[]>([]);

    const handlePrefectureSelection = async (selectedPrefCodes: number[]) => {
        if (selectedPrefCodes.length === 0) {
            setGraphData([]);
            return;
        }

        const promises = selectedPrefCodes.map((prefCode) => fetchPopulation(prefCode));
        const results = await Promise.all(promises);

        const combinedData = results.flatMap((result) => {
            if (result && result.result && Array.isArray(result.result.data)) {
                return result.result.data.flatMap((dataItem: any) => {
                    if (dataItem.label === "総人口" && Array.isArray(dataItem.data)) {
                        return dataItem.data.map((item: any) => ({
                            year: item.year,
                            value: item.value,
                        }));
                    }
                    return [];
                });
            }
            return [];
        });

        console.log('Combined Data:', combinedData); // デバッグ用に処理後のデータをログ出力

        setGraphData(combinedData);
    };

    return (
        <div>
            <PrefectureCheckboxList onSelect={handlePrefectureSelection} />
            <PopulationGraph data={graphData} />
        </div>
    );
};

export default HomePage;