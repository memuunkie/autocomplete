function handleAutocomplete(request, response) {
	var $this = $(".get-search-autocomplete-suggestions"); // class on input field
	var url = $this.data("route-name"); // ASP.NET class 'data-route-name='
	$.getJSON(url + "?term=" + encodeURIComponent(request.term)) // build & encode query string
		.then(function (data) {
			response(data);
		});
}
