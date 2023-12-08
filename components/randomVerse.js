import React, { useState } from 'react';
import { getData } from '../utils/api'; 

export default function RandomVerse() {
    const [verseInfo, setVerseInfo] = useState({});
    const [arabicVerse, setArabicVerse] = useState('');
    const [englishVerse, setEnglishVerse] = useState('');
    const [error, setError] = useState('');

    const fetchRandomVerse = async () => {
        const randomVerseNumber = Math.floor(Math.random() * 6236) + 1; // Random verse
        try {
            // Fetch Arabic version
            const arabicData = await getData(randomVerseNumber, 'quran-simple');
            if (arabicData.status !== 'OK') {
                throw new Error('Arabic verse not found');
            }

            // Fetch English translation
            const englishData = await getData(randomVerseNumber, 'en.asad');
            if (englishData.status !== 'OK') {
                throw new Error('English translation not found');
            }

            setVerseInfo({
                number: arabicData.data.number,
                surahName: arabicData.data.surah.englishName,
                ayahNumber: arabicData.data.numberInSurah
            });
            setArabicVerse(arabicData.data.text);
            setEnglishVerse(englishData.data.text);
            setError('');
            
        } catch (err) {
            setArabicVerse('');
            setEnglishVerse('');
            setVerseInfo({});
            setError(err.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="overflow-auto max-h-[80vh]">
                <div className="bg-white shadow-2xl rounded-lg p-12 w-full max-w-6xl h-auto my-4 mb-20">
                    {error && <div className="error text-red-500">{error}</div>}
    
                    {!error && verseInfo.number && (
                        <div className="verse-info text-center mb-10">
                            <strong>Surah:</strong> {verseInfo.surahName}, 
                            <strong> Ayah:</strong> {verseInfo.ayahNumber}
                        </div>
                    )}
    
                    {arabicVerse && (
                        <div className="flex flex-col items-center mb-5">
                            <div className="text-center text-xl mb-3 flex items-center justify-center">
                                <i className="fas fa-headphones mr-2"></i>
                                {arabicVerse}
                            </div>
                            {englishVerse && <div className="text-center text-lg">{englishVerse}</div>}
                        </div>
                    )}
                </div>
            </div>
        
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded fixed bottom-10 left-1/2 transform -translate-x-1/2" onClick={fetchRandomVerse}>Fetch Random Verse</button>
        </div>
    );
    
    
    
    
}
