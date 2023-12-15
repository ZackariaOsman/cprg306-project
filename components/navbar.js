import React from 'react';

export default function NavBar() {
    return (
        <nav className="bg-green-500 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between">
                <h1 className="text-4xl font-bold">Dhikr</h1>
                <h2 className="text-lg mt-1">Quran Verse Generator</h2>
            </div>
        </nav>
    );
}
