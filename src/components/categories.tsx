"use client"

import React from 'react'

const Categories = () => {
    const categories: string[] = ['blades', 'opener', 'software box', 'multimeter', 'PCD stand', 'Screen protector', 'solder-paste PPD', 'solder-wire', 'Tweezer', 'Skin-cutting machine', 'Flux paste', 'Power supply', 'SMD rework station', 'OCA machine', 'Microscope', 'Soldering-iron', 'LCD seperator', 'Shot killer', 'Tools', 'Knife set', 'Cleaning liquid and spray', 'More Items', 'High-precision disassembly ferler', 'other']
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h2 className="text-2xl font-bold mb-4">Categories</h2>
            <ul className="grid grid-cols-2 gap-4">
                {categories.map((category, index) => (
                    <li key={index} className="bg-gray-100 p-3 rounded-lg shadow hover:bg-gray-200 transition">
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Categories