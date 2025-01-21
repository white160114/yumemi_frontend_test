import React from "react";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface DataPoint {
    year: number;
    value: number;
}

const PopulationGraph = ({ data }: { data: DataPoint[] }) => (
    <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey
            ="value" stroke="#8884d8" /> </LineChart>);

export default PopulationGraph;