import axios from "axios";

//search function

const getQuote = (query) => {
  axios({
    method: "get",
    url:
      `https://cors-anywhere.herokuapp.com/https://frinkiac.com/api/search?q=${query}`,
    responseType: "json"
  }).then(res => {
            console.log(res.data);
//error checking if 0 results
 if (res.data.length === 0) {

document.getElementById("imgCtn").innerHTML = `<img src="./public/td.jpg" alt="Kent Brockman technical difficulties">
  <h3>0 Results Found. Please Search Another Term.</h3>`;
    }
 
else {

    let episode = res.data[0].Episode;
    let timestamp = res.data[0].Timestamp;
    document.getElementById("imgCtn").innerHTML = `<img src="https://frinkiac.com/meme/${episode}/${timestamp}" alt="">`;

axios({
    method: "get",
    url:`https://cors-anywhere.herokuapp.com/https://frinkiac.com/api/caption?e=${episode}&t=${timestamp}`,
    responseType: "json"
  }).then(res => {
    console.log(res);
    res.data.Subtitles.forEach(subtitle => {
     console.log(subtitle.Content);
     document.getElementById("subTtl").innerHTML += `<p>-${subtitle.Content}</p>`;
   });

   document.getElementById("infoBox").innerHTML = `<p>From: ${res.data.Episode.Title}</p>
  <p>Season ${res.data.Episode.Season} Episode #${res.data.Episode.EpisodeNumber}</p>
  <p>Originally Aired On ${res.data.Episode.OriginalAirDate}</p>
  <a href="${res.data.Episode.WikiLink}" target="_blank">More Info</a>`;
  })

}
  });
}

//form event listener

const searchForm = document.getElementById('searchForm');

const searchInput = document.getElementById('searchInput');

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  //get search term
  const searchTerm = searchInput.value;

  //show quotebox 
  document.getElementById("quoteBox").classList.add('quoteBoxFX');

  //clear search field
  searchInput.value = '';

  //clear div where subtitles are shown
  document.getElementById("subTtl").innerHTML ='';
    //search API
    getQuote(searchTerm);
})
