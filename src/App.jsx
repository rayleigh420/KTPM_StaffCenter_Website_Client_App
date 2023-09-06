import DetailLocate from './components/DetailLocate/DetailLocate';
import Header from './components/Header/Header';
import Locate from './components/Locate/Locate';
import Receive from './components/Receive/Receive';
import Status from './components/Status/Status';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route, Link, Router, Routes } from 'react-router-dom';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Receive />} />
				<Route path="/receive" element={<Receive />} />
				<Route path="/locate" element={<Locate />} />
				<Route path="/detailLocate/:id" element={<DetailLocate />} />
				<Route path="/status" element={<Status />} />
			</Routes>

			{/* header  */}
			{/* <Header />

			<Receive /> */}
		</>
	);
}

export default App;
