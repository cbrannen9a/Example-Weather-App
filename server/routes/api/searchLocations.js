
const fetch = require('node-fetch');

module.exports = (app) => {

	let location;

	app.post('/search-location', (req, res) => {

		location = req.body.location;

		if (!location) {
			res.redirect('/error');
		} else {
			res.redirect('/current-weather');
		}
	});

	app.get('/search-location-weather', (req, res) => {
		// build api URL with user zip
		const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=';
		const apiId = '&appid=<APIKEY>&units=metric';
		const userLocation = (url1, url2, location) => {

			let newUrl = url1 + location + url2;
			return newUrl;
		};

		const apiUrl = userLocation(baseUrl, apiId, location);

		fetch(apiUrl)
			.then(res => res.json())
			.then(data => {
				res.send({ data });
			})
			.catch(err => {
				res.redirect('/error');
			});

	});

};