// components/VerseRetrieval.js
import React, { useState } from 'react';
import { getData } from '../utils/api'; 

export default function VerseRetrieval() {
    const [reference, setReference] = useState('');
    const [edition, setEdition] = useState('en.asad');
    const [verse, setVerse] = useState('');
    const [error, setError] = useState('');

    const handleFetchVerse = async () => {
        try {
            const data = await getData(reference, edition);
            if (data.status === 'OK') {
                setVerse(data.data.text);
                setError('');
            } else {
                setVerse('');
                setError('Verse not found. Please check the reference or edition.');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container">
            <h1>Quran Verse Retrieval</h1>
            <input 
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="Enter Verse (e.g., 2:255)"
            />
            <select value={edition} onChange={(e) => setEdition(e.target.value)}>
                <option value="en.asad">English Translation</option>
                <option value="ar.alafasy">Arabic</option>
            </select>
            <button onClick={handleFetchVerse}>Fetch Verse</button>

            {error && <div className="error">{error}</div>}
            {verse && <div className="verse">{verse}</div>}
        </div>
    );
}
