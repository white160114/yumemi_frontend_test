import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DataPoint {
    year: number;
    value: number;
}

const PopulationGraph = ({ data }: { data: DataPoint[] }) => {
    console.log('Graph Data:', data); // デバッグ用にデータをログ出力

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default PopulationGraph;