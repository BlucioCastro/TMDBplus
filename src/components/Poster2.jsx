import { use, useEffect, useState } from "react";

export default function Poster2() {
	const [banner, setBanner] = useState(null)
	const apiKey = import.meta.env.VITE_TMDB_API_KEY

	useEffect(()=>{
		async function fetchPages(pagesToFetch=3) {
			let all = []
			const first = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=1`)
			const firstJson = await first.json()
			all = firstJson.results || []

			for(let p = 1; p<=pagesToFetch; p++){
				const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=${p}`)
				const json = res.json()
				all = all.concat(json.results || [])
			}
			const withBackdrop = all.filter(item => item.backdrop_path)
			const randomMovie = withBackdrop[Math.floor(Math.random()*withBackdrop.length)]
			setBanner(randomMovie)
		}
		fetchPages()
	}, [apiKey])
	return (
		<>
			{banner ? (
				<div>
					<img
						src={`https://image.tmdb.org/t/p/w1280${banner.backdrop_path}`}
						alt={banner.title}
						className="w-full h-full object-cover"
					/>
				</div>
			) : (
				<div>
					<p>Procurando imagens</p>
				</div>
			)}
		</>
	);
}
