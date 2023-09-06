import axios from "axios";

export const getCoordinates = async (targetAddress) => {
	const result = await axios.get(
		`https://maps.googleapis.com/maps/api/geocode/json?address=${targetAddress}&key=${import.meta.env.VITE_PUBLIC_MAP_APIKEY}`
	);
	return {
		lat: result.data.results[0].geometry.location.lat,
		lon: result.data.results[0].geometry.location.lng,
	};
};

export const getAddress = async (coordinate) => {
    const result = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinate.lat},${coordinate.lon}&key=${import.meta.env.VITE_PUBLIC_MAP_APIKEY}`)
    return result.data.results[0].formatted_address
}