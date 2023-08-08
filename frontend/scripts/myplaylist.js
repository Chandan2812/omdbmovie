const url = `http://localhost:8000`

const userID = localStorage.getItem('logedInUserID') || null
if (!userID) {
    alert('Kindly Login First')
    window.location.href="index.html"
    // return
}


const getData = () => {
    fetch(`${url}/playlist/get/${userID}`, {
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data.data)
            displayPlaylist(data.data)
        })
        .catch(err => console.log(err))
}
window.addEventListener("load",()=>{
    getData();
})


function displayPlaylist(movies) {
    const playlistContainer = document.getElementById('playlist-container');
    if(movies.length==0)
    {
        playlistContainer.innerHTML=`<img src="https://cdn.dribbble.com/users/1489103/screenshots/6326497/no-data-found.png">`
    }
    else{
        playlistContainer.innerHTML = ''; 
        for (let movie of movies) {
          const movieElement = document.createElement('div');
          movieElement.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}" id="image">
            <h2 id="title">${movie.Title}</h2>
            <p id="year">${movie.Year}</p>
            <button class="toggle" data-id="${movie._id}" onclick="toggle(this)">${movie.public ? "Add to Private" : "Add to Public"}</button>
            <button class="del" data-id="${movie._id}" onClick="deletePlaylist(this)">Delete</button>
          `;
          playlistContainer.appendChild(movieElement);
        }
    }
 
  }


  function toggle(button){
    const id = button.dataset.id;
    // console.log(id);
      fetch(`${url}/playlist/update/${id}`,{
        method: "PUT",
        headers: {
          "content-type": "application/json"
        },
        })
        .then(res =>res.json())
        .then(data=>{
        //   console.log(data.playlist.public)
          if(data.playlist.public)
          {
            button.innerText="Add to Private"
          }
          else{
            button.innerText="Add to Public"
          }
          
        })
  }
  


  async function deletePlaylist(button) {
    const playlistId = button.dataset.id;
  
      fetch(`${url}/playlist/delete/${playlistId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
    })
  
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        getData()
    })
    .catch(err => console.log(err))
  }
  
  
    

 


  

 
  