import { useEffect, useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function Poster() {
	const [banner, setBanner] = useState(null); // estado para guardar a imagem
	const apiKey = import.meta.env.VITE_TMDB_API_KEY;

	useEffect(() => {
		async function fetchPages(pagesToFetch = 3) {
			let all = [];

			// busca a página 1
			const first = await fetch(
				`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=1`
			);
			const firstJson = await first.json();
			all = firstJson.results || [];

			// busca páginas 2..N (se houver)
			for (let p = 2; p <= pagesToFetch; p++) {
				const res = await fetch(
					`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=${p}`
				);
				const json = await res.json();
				all = all.concat(json.results || []);
			}

			// filtrar os que têm backdrop
			const withBackdrop = all.filter((item) => item.backdrop_path);

			// mapear para URLs completas
			const urls = withBackdrop.map(
				(item) => `https://image.tmdb.org/t/p/w1280${item.backdrop_path}`
			);

			
			const randomMovie =
				withBackdrop[Math.floor(Math.random() * withBackdrop.length)];
			setBanner(randomMovie);
		}

		fetchPages();
	}, [apiKey]); // roda só no mount

	return (
		<>
			{banner ? (
				<div className="relative w-full h-[50vh] sm:h-[80vh] md:h-[90vh] lg:h-[90vh] md:pt-4">
					<img
						src={`https://image.tmdb.org/t/p/w1280${banner.backdrop_path}`}
						alt={banner.title}
						className="w-full h-full object-fill object-top"
					/>
					<div className="absolute inset-0 bg-gradient-to-b from-transparent to-bgDark"></div>

					{/* Texto sobre a imagem */}
					<div className="absolute bottom-12 left-8 z-10 text-white max-w-lg">
						<h1 className="text-2xl md:text-5xl font-bold">{banner.title}</h1>
						<p className="hidden md:block mt-4 text-lg">{banner.overview}</p>
						<div>
							<Link to={`/details/movie/${banner.id}`} className="bg-[#4b4b4b69] px-4 py-4 md:px-8 md:py-4 md:w-80 mt-4 flex items-center gap-3 text-2xl rounded-[.25rem] cursor-pointer">
								<InformationCircleIcon className="w-6 h-6 " />
								Mais Informações
							</Link>
						</div>
					</div>
				</div>
			) : (
				<p>Carregando banner...</p>
			)}
		</>
	);
}
