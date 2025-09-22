import { useEffect, useState } from "react";
import Card from "./Card";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Carousel({ title, url }) {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const apiKey = import.meta.env.VITE_TMDB_API_KEY;

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await fetch(
					`https://api.themoviedb.org/3${url}?api_key=${apiKey}`
				);
				if (!response.ok) {
					throw new Error(`HTTP Error! status: ${response.status}`);
				}
				const result = await response.json();
				setData(result);
				setLoading(false);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);
	if (!data) return <div>Not data found</div>;
	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<>
			<div>
				<h1>{title}</h1>
			</div>
			<div className="flex">
				<button>
					<ChevronLeftIcon className="w-4 h-4" />
				</button>
				<Card data={data} />
				<button>
					<ChevronRightIcon className="w-4 h-4" />
				</button>
			</div>
		</>
	);
}
