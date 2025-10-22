import { useEffect, useState } from "react";

export default function Modal({ closeModal, type, id }) {
  const [trailerUrl, setTrailerUrl] = useState("");
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    async function fetchTrailer() {
      const res = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${apiKey}&language=pt-BR`
      );
      const data = await res.json();
      const trailer = data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailer) setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
    }
    fetchTrailer();
  }, [id, type]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/70 items-center justify-center">
      <div className="w-[90%] md:w-[60%] bg-bgDark p-4 rounded-2xl relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-3 text-white text-xl cursor-pointer"
        >
          ✕
        </button>

        {trailerUrl ? (
          <iframe
            width="100%"
            height="400"
            src={trailerUrl.replace("watch?v=", "embed/")}
            title="Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p className="text-white text-center">Trailer não encontrado 😢</p>
        )}
      </div>
    </div>
  );
}
