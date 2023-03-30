//var userFormEl = document.querySelector('#user-form');
var artistInputEl = document.querySelector('#user-form');
var songContainerEl = document.querySelector('#song-container');
var artistSearchTerm = document.querySelector('#artist-search-term');
var songButtonEl = document.querySelector('#song-button');

function formSubmitHandler(event) {
  event.preventDefault();
    var artist = document.getElementById('username').value;
      console.log('1heheheh', artist);
      if (artist) {
       getArtist(artist);

    songContainerEl.textContent = '';
    artistInputEl.value = '';
  } 
};

// var buttonClickHandler = function (event) {
//   var artistInputEl = event.target.getAttribute('artists');
// console.log('2heheheh');
//   if (artistInputEl) {
//     getFeaturedRepos(artistInputEl);

//     songContainerEl.textContent = '';
//   }
// };

var getArtist = function (artist) {
  console.log('3heheh');
  var apiUrl = 'https://api.spotify.com/v1/search?q=name:'artist:' + artist + '&type=artist&limit=10
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayArtist(data, artist);
        });
      } 
    });
};

var getFeaturedArtist = function (language) {
  var apiUrl = 'https://api.spotify.com/v1/search?q=name:' + track + '%20artist:' + artist + '&type=track&limit=10';

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayArtist(data.items, language);
      });
    } 
  });
};

var displayArtist = function (artist, searchTerm) {
  if (artist.length === 0) {
    songContainerEl.textContent = 'No songs found.';
    return;
  }

  artistSearchTerm.textContent = searchTerm;

  for (var i = 0; i < artist.length; i++) {
    var artistName = artist[i].name + '/' + artist[i].song;

    var artistEl = document.createElement('div');
    artistEl.classList = 'list-item flex-row justify-space-between align-center';

    var titleEl = document.createElement('span');
    titleEl.textContent = artistName;

    artistEl.appendChild(titleEl);

    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    if (artist[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + artist[i].open_issues_count + ' issue(s)';
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    artistEl.appendChild(statusEl);

    songContainerEl.appendChild(repoEl);
  }
};

artistInputEl.addEventListener('click', formSubmitHandler);

//songButtonEl.addEventListener('click', buttonClickHandler);
