function handleAutocomplete(request, response) {
	var $this = $(".get-search-autocomplete-suggestions"); // class on input field
	var url = $this.data("route-name"); // ASP.NET class 'data-route-name='
	$.getJSON(url + "?term=" + encodeURIComponent(request.term)) // build & encode query string
		.then(function (data) {
			response(data);
		});
}

var at = 
	$(".get-search-autocomplete-suggestions").autocomplete({
		source: handleAutocomplete,
		select: function (event, ui) {
			$(".search-form").trigger("submit"); // find id, run search on submit
			// TODO: run search on mouse click
		}
	});

at.data("ui-autocomplete")._renderItem = function (ul, item) {
	var theVal = at.val();
	// workaround to feed renderItem for bolding matching characters without weirdo formatting
	var wrapper = $("<div>")
		.append("<strong>" + theVal + "</strong>" + item.label.substring(theVal.length));
	return $("<li>")
		.attr("data-value", item.value)
		.append(wrapper)
		.appendTo(ul);
};