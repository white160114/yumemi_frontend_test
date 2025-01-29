import { useState, useEffect } from 'react';
import { fetchPrefectures } from '../api/api';
import '../styles/CheckboxList.css'; // CSSファイルをインポート

interface Prefecture {
    prefCode: number;
    prefName: string;
}

const CheckboxList = ({ onSelect }: { onSelect: (selected: number[]) => void }) => {
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
        setSelectedPrefCodes((prevSelected) => {
            const newSelected = prevSelected.includes(prefCode)
                ? prevSelected.filter((code) => code !== prefCode)
                : [...prevSelected, prefCode];
            onSelect(newSelected);
            return newSelected;
        });
    };

    return (
        <div className="checkbox-list">
            <h2>都道府県</h2>
            <p>1つ以上の都道府県を選んでください</p>
            <div className="checkbox-items">
                {prefectures.map((pref) => (
                    <label key={pref.prefCode} className="checkbox-item">
                        <input
                            type="checkbox"
                            value={pref.prefCode}
                            onChange={() => handleCheckboxChange(pref.prefCode)}
                            checked={selectedPrefCodes.includes(pref.prefCode)}
                        />
                        {pref.prefName}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default CheckboxList;