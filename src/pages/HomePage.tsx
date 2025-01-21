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

        const combinedData = results.flatMap((result) =>
            result[0].data.map((item: any) => ({
                year: item.year,
                value: item.value,
            }))
        );

        setGraphData(combinedData);
    };

    return (
        <div>
            <h1>都道府県別人口推移</h1>
            <PrefectureCheckboxList onSelect={handlePrefectureSelection} />
            {graphData.length > 0 ? <PopulationGraph data={graphData} /> : <p>グラフを表示するデータがありません。</p>}
        </div>
    );
};

export default HomePage;
