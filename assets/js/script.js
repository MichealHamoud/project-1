var userFormEl = document.querySelector('#user-form');
var artistInputEl = document.querySelector('#artist');
var songContainerEl = document.querySelector('#song-container');
var artistSearchTerm = document.querySelector('#artist-search-term');
var songButtonEl = document.querySelector('#song-button');

var formSubmitHandler = function (event) {
  event.preventDefault();

  var username = artistInputEl.value.trim();

  if (username) {
    getArtist(username);

    songContainerEl.textContent = '';
    artistInputEl.value = '';
  } 
};

//var buttonClickHandler = function (event) {
  // `event.target` is a reference to the DOM element of what programming language button was clicked on the page
  //var language = event.target.getAttribute('data-language');

  // If there is no language read from the button, don't attempt to fetch repos
  //if (language) {
  //  getFeaturedRepos(language);

   // songContainerEl.textContent = '';
  //}
//};

var getArtist = function (user) {
  var apiUrl = 'https://api.spotify.com/v1/search?q=name:' + song + '%20artist:' + artist + '&type=track&limit=10';

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayArtist(data, user);
        });
      } 
    });
};

var getFeaturedArtist = function (language) {
  // The `q` parameter is what language we want to query, the `+is:featured` flag adds a filter to return only featured repositories
  // The `sort` parameter will instruct GitHub to respond with all of the repositories in order by the number of issues needing help
  var apiUrl = 'https://api.spotify.com/v1/search?q=name:' + song + '%20artist:' + artist + '&type=track&limit=10';

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
    songContainerEl.textContent = 'No repositories found.';
    // Without a `return` statement, the rest of this function will continue to run and perhaps throw an error if `repos` is empty
    return;
  }

  artistSearchTerm.textContent = searchTerm;

  for (var i = 0; i < artist.length; i++) {
    // The result will be `<github-username>/<github-repository-name>`
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

userFormEl.addEventListener('submit', formSubmitHandler);
//songButtonEl.addEventListener('click', buttonClickHandler);
