"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import type { Product } from "@/app/types"

export function HeroSection() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [products, setProducts] = useState<Product[]>([]);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("hero-items.json");
                if (!response.ok) {
                    throw new Error("Network response was not ok")
                }
                const data = await response.json()
                setProducts(data)
            } catch (error) {
                console.error("Failed to fetch products:", error)
            }
        }

        fetchProducts()
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [products.length])

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
    }

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length)
    }

    const currentProduct = products[currentIndex]

    if (!currentProduct) {
        // Optionally, you can show a loading spinner or placeholder here
        return (
            <section className="h-screen flex items-center justify-center bg-gray-50">
                <span className="text-xl text-gray-500">Loading...</span>
            </section>
        )
    }

    return (
        <section className="h-screen flex items-center bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left - Product Info */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-none">{currentProduct.name}</h1>
                            {/* <p className="text-2xl lg:text-4xl font-bold text-gray-600">{currentProduct.price}</p> */}
                        </div>

                        <div className="flex items-center space-x-4">
                            <Button
                                variant="outline"
                                //className="industrial-button-outline px-8 py-3 text-base font-medium tracking-wide uppercase"
                            >
                                View Details
                            </Button>
                        </div>

                        {/* Carousel Controls */}
                        <div className="flex items-center space-x-4">
                            <Button variant="outline" size="icon" onClick={prevSlide} className="industrial-button-outline w-12 h-12">
                                <ChevronLeft className="h-6 w-6" />
                            </Button>
                            <span className="text-sm font-medium tracking-wider">
                                {String(currentIndex + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
                            </span>
                            <Button variant="outline" size="icon" onClick={nextSlide} className="industrial-button-outline w-12 h-12">
                                <ChevronRight className="h-6 w-6" />
                            </Button>
                        </div>
                    </div>

                    {/* Right - Product Image */}
                    <div className="relative">
                        <div className="aspect-square bg-white border-1 border-black overflow-hidden">
                            <Image
                                width={500}
                                height={500}
                                src={`/${currentProduct.local_image_path}`}
                                alt={currentProduct.name}
                                className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                            />
                        </div>

                        {/* Slide Indicators
                        <div className="flex justify-center space-x-2 mt-6">
                            {products.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-3 h-3 border-2 border-black transition-colors ${index === currentIndex ? "bg-black" : "bg-white"
                                        }`}
                                />
                            ))}
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    )
}
