
'use client';
import React, { useState } from 'react';

export default function Home() {
    const [reference, setReference] = useState('');
    const [edition, setEdition] = useState('en.asad');
    const [verse, setVerse] = useState('');

    const fetchVerse = async () => {
        const url = `http://api.alquran.cloud/v1/ayah/${reference}/${edition}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === 'OK') {
            setVerse(data.data.text);
        } else {
            setVerse('Verse not found. Please check the reference or edition.');
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
            <button onClick={fetchVerse}>Fetch Verse</button>

            {verse && <div className="verse">{verse}</div>}
        </div>
    );
}
