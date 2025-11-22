import { Link, useLocation, useNavigate } from "react-router-dom";
import HambNav from "../components/HambNav";
import { useContext, useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { SearchContext } from "../context/SearchContext";



export default function Header() {
	const [menuOpen, setMenuOpen] = useState(false);
  const {query, setQuery, setPreviousRoute, previousRoute} = useContext(SearchContext)
  const navigate = useNavigate()
  const location = useLocation()

  const navLinks = [
    {to: "/", label: "Home"},
    {to: "/series", label: "TV Shows"},
    {to: "/movies", label: "Movies"},
    {to: "/mylist", label: "My List"}
  ]

  const handleChange = (e) =>{
    const value = e.target.value
    setQuery(value)

    if(value.trim() !== ""){
      if(location.pathname !== "/search"){
        setPreviousRoute(location.pathname)
      }
      navigate("/search")
    }
  }
  useEffect(()=>{
    if(query.trim() === ""){
      navigate(previousRoute)
    }
  },[query])

	return (
		<header className="flex md:flex-row w-full justify-between items-center p-4 fixed z-40 bg-black">
			<div className="flex flex-wrap gap-2 md:gap-4 items-center md:mb-0">
				<h1 className="text-[#FF6B35] font-bold ml-0 text-2xl md:text-[1.7rem] md:mr-4 md:ml-4 ">
					TMDb+
				</h1>
				<div className="z-50">
          <button
            className="flex items-center block ml-4 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span>Browse</span>
            <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform ${menuOpen ? "rotate-180" : ""}`}/>
          </button>
          {menuOpen ? (
            <HambNav links={navLinks}
            onSelect={(to)=>{
              navigate(to);
              setMenuOpen(false)
            }}/>
          ) : (
            <div className="flex flex-wrap gap-2 hidden md:gap-4 md:flex md:block md:gap-2 ">
              <Link to="/" className="text-sm md:text-base">
                Home
              </Link>
              <Link to="/series" className="text-sm md:text-base">
                TV Shows
              </Link>
              <Link to="/movies" className="text-sm md:text-base">
                Movies
              </Link>
              <Link to="/myList" className="text-sm md:text-base">
                My List
              </Link>
            </div>
          )}
        </div>
			</div>
			<form className="flex items-center ">
				<input
					type="search"
          value={query}
          onChange={handleChange}
					placeholder="Titles, Genres"
					className="border-2 w-40 md:w-64 px-3 py-1 text-sm md:mr-12 rounded-[.25rem]"
				/>
			</form>
		</header>
	);
}
