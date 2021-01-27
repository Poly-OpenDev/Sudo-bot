title_error = [
	"Why did you try",
	"Wasn't me",
	"Did you break it",
	"Oh great, another one",
	"You can't touch that",
	"_Grunts_",
]

generate_joke = function() {
	fetch("https://icanhazdadjoke.com/", {
		headers: {
			"Accept": "application/json"
		}
	})
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			return data.joke
		})
}
