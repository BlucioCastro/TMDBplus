import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import SearchProvider from "./context/SearchContext.jsx";
import MyListContextProvider from "./context/MylistContext.jsx";

createRoot(document.getElementById("root")).render(
	// <StrictMode>
	// 	<MyListContextProvider>
	// 		<SearchProvider>
	// 			<App />
	// 		</SearchProvider>
	// 	</MyListContextProvider>
	// </StrictMode>
	<MyListContextProvider>
	<SearchProvider>
		<App />
	</SearchProvider>
</MyListContextProvider>
);
