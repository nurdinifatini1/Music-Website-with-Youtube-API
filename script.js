document.addEventListener('DOMContentLoaded', () => {
    const genreBoxes = document.querySelectorAll('.genre-box');

    genreBoxes.forEach(box => {
        box.addEventListener('click', () => {
            genreBoxes.forEach(b => {
                if (b !== box) {
                    b.classList.remove('active');
                    b.querySelector('.description').style.display = 'none';
                    b.querySelector('.player').innerHTML = '';
                }
            });
            box.classList.add('active');
            box.querySelector('.description').style.display = 'block';

            const genre = box.getAttribute('data-genre');
            loadSongDetails(genre, box);
        });
    });
});

function loadSongDetails(genre, box) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'songs.json', true);
    xhr.onload = function() {
        if (this.status === 200) {
            const songs = JSON.parse(this.responseText);
            const song = songs[genre];
            if (song) {
                const playerDiv = box.querySelector('.player');
                playerDiv.innerHTML = `
                    <img src="${song.image}" alt="${song.title} Song Image" class="song-image">
                    <div class="song-title">${song.title}</div>
                    <audio controls>
                        <source src="${song.file}" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                `;
            }
        }
    };
    xhr.send();
}

