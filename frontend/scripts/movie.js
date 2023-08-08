const url="http://localhost:8000"


document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const searchTerm = document.getElementById('search-input').value;
    searchMovies(searchTerm);
   document.getElementById("search-form").reset()
  });
  
  async function searchMovies(searchTerm) {
    const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=83e04016`);
    const data = await response.json();
    
    console.log(data)
    displayMovies(data.Search);
    
  }
  
  function displayMovies(movies) {
    const moviesContainer = document.getElementById('movies-container');
    moviesContainer.innerHTML = ''; 
    for (let movie of movies) {
      const movieElement = document.createElement('div');
      movieElement.innerHTML = `
        <img src="${movie.Poster}" alt="${movie.Title}" id="image">
        <h2 id="title">${movie.Title}</h2>
        <p id="year">${movie.Year}</p>
        <button id="add" onClick="add()">Add to Playlist</button>
      `;
      moviesContainer.appendChild(movieElement);
    }
  }
  

function add(){
  const logedInUserID = localStorage.getItem('logedInUserID') || null
  if (!logedInUserID) {
    alert(' Kindly Login First')
    return
  }
  const Poster=document.getElementById("image").src
  const Title=document.getElementById("title").innerText
  const Year=document.getElementById("year").innerText
  

  const payload={
    userId:logedInUserID,
    Poster,
    Title,
    Year
  }

  fetch(`${url}/playlist/add`,{
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(payload)
    })
    .then(res =>res.json())
    .then(data=>{
      console.log(data)
      if(data.message!='Already present in the playlist'){
      Swal.fire(
        'Added to your playlist',
        'See your Playlist',
        'success'
      )
      }
      else{
        Swal.fire(
          'Already available in the playlist',
          '',
          'error',
        )
      }
    })
  

}







