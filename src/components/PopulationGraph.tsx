import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DataPoint {
    year: number;
    value: number;
}

interface GraphData {
    prefCode: number;
    data: DataPoint[];
}

const PopulationGraph = ({ data }: { data: GraphData[] }) => {
    console.log('Graph Data:', data); // デバッグ用にデータをログ出力

    // 全てのデータポイントを統一されたX軸にマッピング
    const allYears = Array.from(new Set(data.flatMap(prefData => prefData.data.map(point => point.year)))).sort();

    const unifiedData = allYears.map(year => {
        const yearData: { year: number, [key: string]: number | undefined } = { year };
        data.forEach(prefData => {
            const point = prefData.data.find(p => p.year === year);
            yearData[`value_${prefData.prefCode}`] = point ? point.value : undefined;
        });
        return yearData;
    });

    return (
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
                <LineChart data={unifiedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    {data.map((prefData) => (
                        <Line
                            key={prefData.prefCode}
                            type="monotone"
                            dataKey={`value_${prefData.prefCode}`}
                            name={`Prefecture ${prefData.prefCode}`}
                            stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PopulationGraph;