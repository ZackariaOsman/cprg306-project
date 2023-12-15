import React, { useState } from 'react';
import { getData } from '../utils/api'; 

export default function RandomVerse() {
    const [verseInfo, setVerseInfo] = useState({});
    const [arabicVerse, setArabicVerse] = useState('');
    const [englishVerse, setEnglishVerse] = useState('');
    const [error, setError] = useState('');
    const [isVerseLoaded, setIsVerseLoaded] = useState(false);

    const fetchRandomVerse = async () => {
        const randomVerseNumber = Math.floor(Math.random() * 6236) + 1;
        try {
            const arabicData = await getData(randomVerseNumber, 'quran-simple');
            const englishData = await getData(randomVerseNumber, 'en.asad');

            if (arabicData.status !== 'OK' || englishData.status !== 'OK') {
                throw new Error('Verse not found');
            }

            setVerseInfo({
                number: arabicData.data.number,
                surahName: arabicData.data.surah.englishName,
                ayahNumber: arabicData.data.numberInSurah
            });
            setArabicVerse(arabicData.data.text);
            setEnglishVerse(englishData.data.text);
            setIsVerseLoaded(true); // update the state to showw a verse has been loaded
            setError('');
            
        } catch (err) {
            setArabicVerse('');
            setEnglishVerse('');
            setVerseInfo({});
            setIsVerseLoaded(false); // reset state
            setError(err.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="overflow-auto max-h-[80vh]">
                <div className="bg-white shadow-2xl rounded-lg p-12 w-full max-w-6xl h-auto my-4 mb-20">
                    {error && <div className="error text-red-500">{error}</div>}
    
                    {!isVerseLoaded && !error && (
                        <div className=" text-center text-xl">
                            <p>Welcome!</p>
                            <br /> 
                            <p>Click the button below generate a random verse.</p>
                        </div>
                    )}
                    
                    {isVerseLoaded && !error && (
                        <div>
                        <div className="verse-info text-center mb-10">
                            <strong>Surah:</strong> {verseInfo.surahName}, 
                            <strong> Ayah:</strong> {verseInfo.ayahNumber}
                        </div>
                
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
                    )}
                </div>
            </div>
        
            <button className="my-11 text-xl bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded fixed bottom-10 left-1/2 transform -translate-x-1/2" onClick={fetchRandomVerse}>
                Generate Verse
            </button>
        </div>
    );
}
