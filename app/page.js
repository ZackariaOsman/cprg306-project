
'use client';
import React from "react";
import VerseRetrieval from "components/verseRetrieval";
import RandomVerse from "components/randomVerse"; 
import NavBar from "components/navbar";


export default function Home() {
  return (
      <div>
        <NavBar></NavBar>
        <RandomVerse ></RandomVerse> 
      </div>
  );
}
