import { Link } from "react-router-dom";
import HambNav from "../components/HambNav";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { CakeIcon } from "@heroicons/react/16/solid";



export default function Header() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<header className="flex md:flex-row w-full justify-between items-center p-4">
			<div className="flex flex-wrap gap-2 md:gap-4 items-center md:mb-0">
				<h1 className="text-red-600 font-bold ml-0 text-2xl md:text-3xl md:mr-12 md:ml-8 ">
					FKFLX
				</h1>
				<div className="z-50">
          <button
            className="flex items-center block ml-4 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span>Navegar</span>
            <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform ${menuOpen ? "rotate-180" : ""}`}/>
          </button>
          {menuOpen ? (
            <HambNav />
          ) : (
            <div className="flex flex-wrap gap-2 hidden md:gap-4 md:flex md:block md:gap-2 ">
              <Link to="/" className="text-sm md:text-base">
                Inicio
              </Link>
              <Link to="/series" className="text-sm md:text-base">
                Séries
              </Link>
              <Link to="/movies" className="text-sm md:text-base">
                Filmes
              </Link>
              <Link to="/myList" className="text-sm md:text-base">
                Minha Lista
              </Link>
            </div>
          )}
        </div>
			</div>
			<form className="flex items-center">
				<input
					type="search"
					placeholder="Titulos, generos"
					className="border-2 w-full md:w-64 px-3 py-1 text-sm"
				/>
			</form>
		</header>
	);
}
