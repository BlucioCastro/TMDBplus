import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/Home";
import Series from "../pages/Series";
import Movies from "../pages/Movies";
import MyList from "../pages/MyList";
import Chosed from "../pages/Chosed";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "/details/:type/:id",
				element: <Chosed />,
			},
			{
				path: "/series",
				element: <Series />,
			},
			{
				path: "/movies",
				element: <Movies />,
			},
			{
				path: "/myList",
				element: <MyList />,
			},
		],
	},
]);
export default router;
