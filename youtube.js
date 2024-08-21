const API_KEY = 'AIzaSyDNCCFLVRQkg6mIVCv6ZdgBVyhKfhSEcqI'; 
const $searchButton = $('#search-button');
const $searchInput = $('#search-input');
const $resultsContainer = $('#results');
const $suggestionsContainer = $('#suggestions');

$searchButton.on('click', () => {
    const query = $searchInput.val();
    searchYouTube(query);
});

$searchInput.on('keyup', () => {
    const query = $searchInput.val();
    if (query.length > 2) {
        fetchSuggestions(query);
    } else {
        $suggestionsContainer.empty();
    }
});

function fetchSuggestions(query) {
    $.ajax({
        url: `https://www.googleapis.com/youtube/v3/search`,
        method: 'GET',
        data: {
            part: 'snippet',
            q: query,
            type: 'video',
            key: API_KEY
        },
        success: function(data) {
            displaySuggestions(data.items);
        },
        error: function(error) {
            console.error('Error fetching YouTube API:', error);
        }
    });
}

function displaySuggestions(videos) {
    $suggestionsContainer.empty();
    videos.forEach(video => {
        const $suggestionItem = $('<div>').addClass('suggestion-item').text(video.snippet.title);
        $suggestionItem.on('click', () => {
            $searchInput.val(video.snippet.title);
            $suggestionsContainer.empty();
            searchYouTube(video.snippet.title);
        });
        $suggestionsContainer.append($suggestionItem);
    });
}

function searchYouTube(query) {
    $.ajax({
        url: `https://www.googleapis.com/youtube/v3/search`,
        method: 'GET',
        data: {
            part: 'snippet',
            q: query,
            type: 'video',
            key: API_KEY
        },
        success: function(data) {
            displayResults(data.items);
        },
        error: function(error) {
            console.error('Error fetching YouTube API:', error);
        }
    });
}

function displayResults(videos) {
    $resultsContainer.empty();
    videos.forEach(video => {
        const $videoItem = $('<div>').addClass('video-item');

        const $thumbnail = $('<img>').attr('src', video.snippet.thumbnails.default.url);
        $videoItem.append($thumbnail);

        const $title = $('<div>').text(video.snippet.title);
        $videoItem.append($title);

        const videoId = video.id.videoId;
        const $iframe = $('<iframe>').attr({
            width: '560',
            height: '315',
            src: `https://www.youtube.com/embed/${videoId}`,
            frameborder: '0',
            allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
            allowfullscreen: true
        });

        $videoItem.append($iframe);
        $resultsContainer.append($videoItem);
    });
}
