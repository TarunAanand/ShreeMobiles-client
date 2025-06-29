"use client";

import React from "react";
import  Link  from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Navbar: React.FC = () => {
    return (
        <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
            <span className="flex flex-row items-center space-x-2">
                <Image
                    src="/sm-high-resolution-logo.png"
                    alt="Shree Mobiles Logo"
                    width={50}
                    height={50}
                    className="pt-1.7"
                />
            <span className="text-2xl font-bold text-black-800">Shree Mobiles</span>
            </span>
            <nav className="space-x-6">
                <Link href="/" className="text-gray-800 font-semibold hover:text-blue-600 transition">
                    Home
                </Link>
                <Link href="/shop" className="text-gray-800 font-semibold hover:text-blue-600 transitisson">
                    Categories
                </Link>
                <Link href="/about" className="text-gray-800 font-semibold hover:text-blue-600 transition">
                    About
                </Link>
            </nav>
            <Button>Shop now</Button>
        </header>
    );
};

export default Navbar;
