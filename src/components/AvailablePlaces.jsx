import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
	const [isFetching, setIsFetching] = useState(false);
	const [availablePlaces, setAvailablePlaces] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		(async function () {
			setIsFetching(true);
			try {
				const places = await fetchAvailablePlaces();

				navigator.geolocation.getCurrentPosition((pos) => {
					const sortedPlaces = sortPlacesByDistance(
						places,
						pos.coords.latitude,
						pos.coords.longitude
					);
					setAvailablePlaces(sortedPlaces);
					setIsFetching(false);
				});
			} catch (err) {
				setError({
					message: err.message || 'Failed to fetch places. Please try again.',
				});
				setIsFetching(false);
			}
		})();
	}, []);

	if (error) return <Error title='An error occurred' message={error.message} />;

	return (
		<Places
			title='Available Places'
			places={availablePlaces}
			isLoading={isFetching}
			loadingText={'Fetching places data...'}
			fallbackText='No places available.'
			onSelectPlace={onSelectPlace}
		/>
	);
}
