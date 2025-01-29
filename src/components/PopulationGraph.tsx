import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import "../styles/PoplationGraph.css";

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

const PopulationGraph = ({ data, prefectures }: { data: GraphData[], prefectures: Prefecture[] }) => {
    console.log('Graph Data:', data); // デバッグ用にデータをログ出力

    // 都道府県コードと都道府県名のマッピングを作成
    const prefectureMap = new Map(prefectures.map(pref => [pref.prefCode, pref.prefName]));

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

    /// Y軸の値を「m」単位で表示するフォーマッタ
    const yAxisTickFormatter = (value: number) => {
        return `${(value / 1000000).toFixed(1)}m`;
    };

    // カスタムツールチップコンポーネント

    return (
        <div className="population-graph">
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={unifiedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={yAxisTickFormatter} />
                    <Tooltip formatter={(value, name) => {
                        if (typeof name === 'string') {
                            const prefCode = parseInt(name.split('_')[1], 10);
                            const prefName = prefectureMap.get(prefCode) || `Prefecture ${prefCode}`;
                            return [`${value}`, `${prefName}`];
                        }
                        return [`${value}`, `${name}`];
                    }}
                        labelFormatter={(label) => `Year: ${label}`}
                    />
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