export const fetchAvailablePlaces = async function () {
	const response = await fetch('http://localhost:3000/places');
	const resData = await response.json();

	if (!response.ok)
		throw new Error('Failed to fetch places. Please try again.');

	return resData.places;
};

export const fetchUserPlaces = async function () {
	const response = await fetch('http://localhost:3000/user-places');
	const resData = await response.json();

	if (!response.ok)
		throw new Error('Failed to fetch user places. Please try again.');

	return resData.places;
};

export const updateUserPlaces = async function (places) {
	const response = await fetch('http://localhost:3000/user-places', {
		method: 'PUT',
		body: JSON.stringify({ places }),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const resData = await response.json();

	if (!response.ok) throw new Error('Failed to update user data.');

	return resData.message;
};
