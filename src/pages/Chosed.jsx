import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, HeartIcon, PlayIcon } from "@heroicons/react/24/solid";
import anonimous from "../assets/unknown.png";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../css/custom-swiper-bullet.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import { useMyList } from "../context/MylistContext";

export default function Chosed() {
	const { type, id } = useParams();
	const [data, setData] = useState(null);
	const [dataCast, setDataCast] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();
	const { mylist, addToList, removeFromList } = useMyList();

	const apiKey = import.meta.env.VITE_TMDB_API_KEY;
	useEffect(() => {
		async function fetchPage() {
			const page = await fetch(
				`https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}`
			);
			const castPage = await fetch(
				`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${apiKey}`
			);
			const resCast = await castPage.json();
			const res = await page.json();
			setDataCast(
				resCast.cast.map((item) => ({
					...item,
					imageUrl: getImageProfile(item),
				}))
			);
			setData(res);
		}
		fetchPage();
	}, [id, type]);

	function getImageProfile(item) {
		if (item.profile_path) {
			return `https://image.tmdb.org/t/p/w185${item.profile_path}`;
		} else {
			return anonimous;
		}
	}
	useEffect(()=>{
		window.scrollTo(0, 0)
	}, [id])

	const isInList =
		data && mylist.some((i) => i.id === data.id && i.type === type);
	return (
		<>
			<div>
				<button
					onClick={() => navigate(-1)}
					className="text-white  p-2 mt-20 rounded "
				>
					<ArrowLeftIcon className="w-6 h-6 ml-3 mb-4 cursor-pointer" />
				</button>
			</div>
			{data ? (
				<div>
					<div className="relative hidden md:block md:w-full md:h-[50vh] lg:h-[70vh]">
						<img
							src={`https://image.tmdb.org/t/p/w1280${data.backdrop_path}`}
							alt=""
							className="w-full h-full object-fill object-center"
						/>
						<img
							src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
							alt=""
							className=" absolute left-20 top-1/2 -translate-y-1/2 h-100 rounded-[.5rem] border-4 border-black shadow-black shadow-md md:h-70 lg:h-100 xl:h-115 2xl:h-115"
						/>
					</div>

					{/* versão mobile do poster */}
					<div className="md:hidden flex justify-center mt-6">
						<img
							src={`https://image.tmdb.org/t/p/w342${data.poster_path}`}
							alt=""
							className="w-40 rounded-md border-2 border-black shadow-md"
						/>
					</div>
					<div className="mx-4">
						<div className="md:grid md:grid-cols-2 md:mx-12 ">
							<div className="flex items-end gap-3">
								<h1 className="text-white text-2xl font-medium mt-8">
									{data.title || data.name}
								</h1>
								<span className="text-2xl text-gray-200">
									(
									{new Date(
										data.first_air_date || data.release_date
									).getFullYear()}
									)
								</span>
							</div>
							<div className="flex flex-row gap-2 md:col-1">
								{data.genres?.map((genre) => (
									<div key={genre.id} className="text-gray-300 pb-4">
										<span>{` ${genre.name}, `}</span>
									</div>
								))}
							</div>

							<p className="text-gray-200 md:col-1 italic">{data.tagline}</p>
							<div className="mt-4 md:col-2 md:ml-24 md:row-2">
								<span className="text-[1.2rem] font-medium">Average:</span>
								<span className="text-[#E7000B] text-[1.1rem]">
									{" "}
									{data.vote_average.toFixed(1)}
								</span>
							</div>
							<div className=" md:col-2 md:ml-24 md:row-3">
								{type === "tv" ? (
									<div className="flex items-center gap-2">
										<p className="text-[1.2rem] font-medium">Season: </p>
										<p className="text-[1.1rem]">{data.number_of_seasons} </p>
									</div>
								) : (
									<div className="flex items-center gap-2">
										<p className="text-[1.2rem] font-medium">Runtime: </p>
										<p className="">
											{Math.floor(data.runtime / 60)}h {data.runtime % 60}m
										</p>
									</div>
								)}
							</div>
							<div className="md:col-2 row-4 md:ml-24 flex flex-row gap-4 mt-4 items-start">
								<button
									onClick={() => {
										if (!data) return;

										if (isInList) {
											removeFromList({ id: data.id, type });
										} else {
											addToList({
												id: data.id,
												type,
												title: data.title || data.name,
												poster_path: data.poster_path,
												backdrop_path: data.backdrop_path,
											});
										}
									}}
								>
									<HeartIcon
										className={`w-6 h-6 cursor-pointer ${
											isInList ? "text-orange-500" : "text-white"
										}`}
									/>
								</button>
								<button
									className="flex items-center cursor-pointer"
									onClick={() => setShowModal(!showModal)}
								>
									<PlayIcon className="w-6 h-6 " />
									<span className="font-medium">Play Trailer</span>
								</button>
							</div>
							{showModal && (
								<Modal
									type={type}
									id={id}
									closeModal={() => setShowModal(!showModal)}
								/>
							)}
							<div className="md:col-1">
								<h2 className="text-[1.25rem] font-medium pt-4">Overview</h2>
								<p>{data.overview}</p>
							</div>
						</div>
						{dataCast && dataCast.length > 0 && (
							<div className="mt-4 mb-12">
								<h2 className="text-2xl font-medium pb-3 md:mx-12">
									Top Billed Cast
								</h2>
								<Swiper
									modules={[Navigation, Pagination]}
									spaceBetween={12}
									loop={false}
									slidesPerView={1}
									navigation
									// pagination={{clickable: true}}
									className="w-full"
									breakpoints={{
										375: { slidesPerView: 3 },
										640: { slidesPerView: 6 },
										768: { slidesPerView: 7 },
										1024: { slidesPerView: 9 },
									}}
								>
									<div className="mb-12">
										{dataCast.map((castItem) => (
											<SwiperSlide key={castItem.id}>
												<img
													src={castItem.imageUrl}
													alt={castItem.character}
													className=" w-full md:h-[13rem] rounded-t-[.5rem]"
												/>
												<div className="bg-amber-50 h-[6rem] pl-2 rounded-b-[.5rem]">
													<p className="text-[1.25rem] text-black font-medium">
														{castItem.name}
													</p>
													<p className="text-black">{castItem.character}</p>
												</div>
											</SwiperSlide>
										))}
									</div>
								</Swiper>
							</div>
						)}
					</div>
				</div>
			) : (
				<Loading />
			)}
		</>
	);
}
