const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = "AIzaSyC9TravZTqMYX7RCCeotUOKvVYR3-oJ4Sg";

function getDataFromApi(searchTerm, callback) {
  const query = {
    part: 'snippet',
    key: API_KEY,
    q: `${searchTerm} in:name`
  }; 
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback); 
}

function renderResult(result) {
  return `
  <div>
	  <h2>
		<a class="js-result-name" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">${result.snippet.title}</a> 
		</h2>
	  <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank"><img src="${result.snippet.thumbnails.medium.url}"></a>
  `; 
}

function displayYouTubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item)); 
  $('.js-search-results').html(results); 
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault(); 
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val(); 
    queryTarget.val(""); 
    getDataFromApi(query, displayYouTubeSearchData); 
  }); 
}

$(watchSubmit); 
