import { useEffect, useState } from "react";
import Card from "./Card";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../css/custom-swiper-bullet.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import Loading from "./Loading";


export default function Carousel({ title, url }) {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const apiKey = import.meta.env.VITE_TMDB_API_KEY;

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				let all = []
				for(let p = 1; p<=3; p++){
					const response = await fetch(
						`https://api.themoviedb.org/3${url}?api_key=${apiKey}&page=${p}`
					);
					if (!response.ok) {
						throw new Error(`HTTP Error! status: ${response.status}`);
					}
					const result = await response.json();
					all = all.concat(result.results || [])
				}
				const unique = all.filter((item, index, self) => index ===self.findIndex((t) => t.id === item.id))
				setData(unique);
				setLoading(false);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [url, apiKey]);
	if (!data) return <Loading/>;
	if (loading) return <Loading/>;
	if (error) return <div>Error: {error}</div>;

	const mediaType = url.includes("/tv") ? "tv" : "movie"
	return (
		<>
			<div className="mx-12 mb-8">
				<div>
					<h1 className="text-2xl font-medium pb-4">{title}</h1>
				</div>
				<Swiper
					modules={[Navigation, Pagination]}
					spaceBetween={12}
					loop={true}
					slidesPerView={1}
					navigation
					// pagination={{clickable: true}}
					className="w-full"
					breakpoints={{
						375: { slidesPerView: 2 },
						640: { slidesPerView: 3 },
						768: { slidesPerView: 4 },
						1024: { slidesPerView: 6 },
					}}
				>
					<div className="mx-8">
						{data.map((item) => (
							<SwiperSlide key={item.id} className="">
								<Link to={`/details/${mediaType}/${item.id}`}>
									<Card item={item} />
								</Link>
							</SwiperSlide>
						))}
					</div>
				</Swiper>
			</div>
		</>
	);
}
