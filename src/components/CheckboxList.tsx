import React, { useState, useEffect } from 'react';
import { fetchPrefectures } from '../api/api';

interface Prefecture {
    prefCode: number;
    prefName: string;
}

const PrefectureCheckboxList = ({ onSelect }: { onSelect: (selected: number[]) => void }) => {
    const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
    const [selectedPrefCodes, setSelectedPrefCodes] = useState<number[]>([]);

    useEffect(() => {
        const getPrefectures = async () => {
            const data = await fetchPrefectures();
            setPrefectures(data);
        };
        getPrefectures();
    }, []);

    const handleCheckboxChange = (prefCode: number) => {
        setSelectedPrefCodes((prev) => {
            const newSelected = prev.includes(prefCode)
                ? prev.filter((code) => code !== prefCode)
                : [...prev, prefCode];
            onSelect(newSelected); // 親に選択結果を渡す
            return newSelected;
        });
    };

    return (
        <div>
            {prefectures.map((pref) => (
                <label key={pref.prefCode}>
                    <input
                        type="checkbox"
                        value={pref.prefCode}
                        onChange={() => handleCheckboxChange(pref.prefCode)}
                    />
                    {pref.prefName}
                </label>
            ))}
        </div>
    );
};

export default PrefectureCheckboxList;
