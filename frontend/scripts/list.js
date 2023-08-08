const url = `http://localhost:8000`
const userID = localStorage.getItem('logedInUserID') || null
const listId = localStorage.getItem('listId') || null
if (!userID) {
    alert('Kindly Login First')
    // return
}


const getData = () => {
    fetch(`${url}/playlist/getPublic/${listId}`, {
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            displayPlaylist(data.data)
        })
        .catch(err => console.log(err))
}
window.addEventListener("load",()=>{
    getData();
})


function displayPlaylist(playlists) {
    const listContainer = document.getElementById('list-container');
    if(playlists.length==0)
    {
        listContainer.innerHTML=`<img src="https://cdn.dribbble.com/users/1489103/screenshots/6326497/no-data-found.png">`
    }
    else{
        listContainer.innerHTML = ''; 
        for (let list of playlists) {
          const movieElement = document.createElement('div');
          movieElement.innerHTML = `
            <img src="${list.Poster}" alt="${list.Title}" id="image">
            <h2 id="title">${list.Title}</h2>
            <p id="year">${list.Year}</p>
            
          `;
          
          listContainer.appendChild(movieElement);
        }
    }
   
  }