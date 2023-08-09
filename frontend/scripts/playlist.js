const url = `https://movie-playlist.onrender.com`

const userID = localStorage.getItem('logedInUserID') || null
if (!userID) {
    alert('Kindly Login First')
    window.location.href="index.html"
    // return
}


const createPlaylist=()=>{
    fetch(`${url}/playlist/create`,{
        headers:{
            "Content-Type": "application/json",
        }
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        displayPlaylist(data)
    })
    .catch(err => console.log(err))
}

window.addEventListener("load",()=>{
    createPlaylist()
})



function displayPlaylist(playlists) {
    const playlistContainer = document.getElementById('playlist-container');
    playlistContainer.innerHTML = ''; 
    for (let playlist of playlists) {
      const movieElement = document.createElement('div');
      movieElement.innerHTML = `
       
        <h2>${playlist.username}</h2>
        
      `;
      movieElement.addEventListener("click",()=>{
        window.location.href="list.html"
        localStorage.setItem("listId", playlist._id);
        // console.log(playlist._id)
      })
      playlistContainer.appendChild(movieElement);
    }
  }