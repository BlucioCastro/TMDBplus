import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Chosed() {
	const { type, id } = useParams();
	const [data, setData] = useState(null);
	const apiKey = import.meta.env.VITE_TMDB_API_KEY;
	useEffect(() => {
		async function fetchPage() {
			const page = await fetch(
				`https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}`
			);
			const res = await page.json();
			console.log("detalhes: ", res);
			setData(res);
		}
		fetchPage();
	}, [id, type]);

	return (
		<>
			{data ? (
				<div>
					<h1 className="text-white">{data.title || data.name}</h1>
					<img
						src={`https://image.tmdb.org/t/p/w342${data.poster_path}`}
						alt=""
					/>
				</div>
			) : (
				<p>Carregando...</p>
			)}
		</>
	);
}
