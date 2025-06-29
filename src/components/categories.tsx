"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

type Category = {
	name: string;
	subcategories: string[];
};

const Categories = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		null
	);
	const [position, setPosition] = useState<{ top: number; left: number }>({
		top: 0,
		left: 0,
	});

	const sidebarRef = useRef<HTMLDivElement>(null);
	const subcategoryRef = useRef<HTMLDivElement>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const getCategories = async () => {
			const res = await fetch("/categories.json");
			const data = await res.json();
			setCategories(data);
		};
		getCategories();

		// Close subcategories when clicking outside
		const handleClickOutside = (event: MouseEvent) => {
			if (
				subcategoryRef.current &&
				!subcategoryRef.current.contains(event.target as Node) &&
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setSelectedCategory(null);
				setHoveredCategory(null);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleMouseEnter = (
		categoryName: string,
		event: React.MouseEvent<HTMLDivElement>
	) => {
		const rect = event.currentTarget.getBoundingClientRect();
		setPosition({
			top: Math.min(rect.top, window.innerHeight - 300), // Prevent going off screen
			left: rect.right,
		});
		setHoveredCategory(categoryName);
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
	};

	const handleMouseLeave = () => {
		timeoutRef.current = setTimeout(() => {
			if (!selectedCategory) {
				setHoveredCategory(null);
			}
		}, 200);
	};

	const handleCategoryClick = (categoryName: string) => {
		if (selectedCategory === categoryName) {
			setSelectedCategory(null);
		} else {
			setSelectedCategory(categoryName);
		}
		setHoveredCategory(null); // Clear hover state when clicking
	};

	const handleSubcategoryMouseEnter = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
	};

	const handleSubcategoryMouseLeave = () => {
		if (!selectedCategory) {
			timeoutRef.current = setTimeout(
				() => setHoveredCategory(null),
				200
			);
		}
	};

	const activeCategory = hoveredCategory || selectedCategory;
	const currentSubcategories = activeCategory
		? categories.find((cat) => cat.name === activeCategory)
				?.subcategories || []
		: [];

	return (
		<div className="flex h-screen relative">
			<Card
				className="w-64 h-full rounded-none border-r"
				ref={sidebarRef}
			>
				<CardContent className="p-4">
					<h3 className="text-xl font-semibold mb-4">Categories</h3>
					<ScrollArea className="h-[calc(100vh-5rem)]">
						{categories.map((category) => (
							<div
								key={category.name}
								onMouseEnter={(e) =>
									handleMouseEnter(category.name, e)
								}
								onMouseLeave={handleMouseLeave}
								onClick={() =>
									handleCategoryClick(category.name)
								}
								className={cn(
									"p-3 rounded-md cursor-pointer transition-colors mb-1 text-base flex justify-between items-center group",
									hoveredCategory === category.name ||
										selectedCategory === category.name
										? "bg-primary/10 text-primary font-medium"
										: "hover:bg-muted/50"
								)}
							>
								<div>
									<div className="font-medium">
										{category.name}
									</div>
									<div className="text-xs text-muted-foreground">
										{category.subcategories.length}{" "}
										subcategories
									</div>
								</div>
								<ChevronRight
									className={cn(
										"h-4 w-4 text-muted-foreground transition-transform",
										(hoveredCategory === category.name ||
											selectedCategory ===
												category.name) &&
											"transform translate-x-1 text-primary"
									)}
								/>
							</div>
						))}
					</ScrollArea>
				</CardContent>
			</Card>

			{/* Subcategory panel */}
			{activeCategory && currentSubcategories.length > 0 && (
				<Card
					className={cn(
						"absolute w-72 z-50 shadow-lg transition-opacity duration-200",
						hoveredCategory ? "opacity-100" : "opacity-0"
					)}
					style={{
						top: position.top,
						left: position.left + 8,
						opacity: selectedCategory ? 1 : undefined, // Force full opacity when selected
					}}
					onMouseLeave={handleSubcategoryMouseLeave}
					onMouseEnter={handleSubcategoryMouseEnter}
					ref={subcategoryRef}
				>
					<CardContent className="p-4">
						<h4 className="text-lg font-semibold mb-3 pb-2 border-b">
							{activeCategory}
						</h4>
						<ul className="space-y-2">
							{currentSubcategories.map((sub) => (
								<li
									key={sub}
									className="p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors flex items-center"
								>
									<ChevronRight className="h-3 w-3 mr-2 text-muted-foreground" />
									<span className="text-muted-foreground hover:text-foreground">
										{sub}
									</span>
								</li>
							))}
						</ul>
					</CardContent>
				</Card>
			)}
		</div>
	);
};

export default Categories;
