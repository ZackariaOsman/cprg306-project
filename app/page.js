
'use client';
import React from "react";
import VerseRetrieval from "components/verseRetrieval";
import RandomVerse from "components/randomVerse"; 

export default function Home() {
  return (
      <div>
          <h1 className="mb-4">Random Quran Verse</h1>
          <RandomVerse ></RandomVerse> 
      </div>
  );
}
