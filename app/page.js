
'use client';
import React, { useState } from 'react';

async function getData(reference, edition) {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  console.log("Base URL:", baseUrl); // This line will print the base URL to the console
  const url = `${baseUrl}/ayah/${reference}/${edition}`;
  const res = await fetch(url);

  if (!res.ok) {
      throw new Error('Failed to fetch verse');
  }

  return res.json();
}

export default function Home() {
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

            {verse && <div className="verse">{verse}</div>}
        </div>
    );
}
