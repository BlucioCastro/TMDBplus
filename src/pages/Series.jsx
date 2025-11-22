import { useEffect, useState } from "react";
import Poster from "../components/Poster";
import Carousel from "../components/Carousel";
import Menu from "../components/MenuClassification"
import HambNav from "../components/HambNav";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function Series() {
	const [category, setCategory] = useState("top_rated");
	const [isOpen, setIsOpen] = useState(false);
	const listOfCategories = [
		{ to: "/tv/top_rated", label: "Top Rated" },
		{ to: "/tv/airing_today", label: "Airing Today" },
		{ to: "/tv/on_the_air", label: "On TV" },
		{ to: "/tv/popular", label: "Popular" },
	];
	
	let currentCategory = listOfCategories.find(
		(item) => item.to === `/tv/${category}`
	);
	return (
		<>
			<Poster type="tv" category={category} />
			<div className="ml-12 mb-4 flex gap-2 items-center">
				{/* <p className="text-[1.1rem] font-medium">Currently in: </p> */}
				<div className="border-2  rounded-[.25rem] w-[10.5rem]">
					<button
						onClick={() => setIsOpen(!isOpen)}
						className=" font-medium cursor-pointer  flex items-center gap-2 mx-auto"
					>
						{currentCategory?.label || category}
						<ChevronDownIcon
						className={`w-4 h-4 transition-transform ${
							isOpen ? "rotate-180" : ""
						}`}
					/>
					</button>
					{isOpen && (
						<Menu
							links={listOfCategories}
							onSelect={(path) => {
								setCategory(path.split("/").pop());
								setIsOpen(false);
							}}
						/>
					)}
					
				</div>
			</div>
			<Carousel url={`/tv/${category}`} pageNumber={1} />
			<Carousel url={`/tv/${category}`} pageNumber={2} />
			<Carousel url={`/tv/${category}`} pageNumber={3} />
			<Carousel url={`/tv/${category}`} pageNumber={4} />
			<Carousel url={`/tv/${category}`} pageNumber={5} />
			<Carousel url={`/tv/${category}`} pageNumber={6} />
			<Carousel url={`/tv/${category}`} pageNumber={7} />
			<Carousel url={`/tv/${category}`} pageNumber={8} />
			<Carousel url={`/tv/${category}`} pageNumber={9} />
			<Carousel url={`/tv/${category}`} pageNumber={10} />
		</>
	);
}
