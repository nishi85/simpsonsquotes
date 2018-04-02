const simpson = {};

//get input from search field
 simpson.querySearch = () => {
    let query = $('input[type=search]').val();
    simpson.getQuote(query);
}

//search input in the API. Had to use proxy.
  simpson.getQuote = (query) => {
  $.ajax({
    url: `https://cors-anywhere.herokuapp.com/https://frinkiac.com/api/search?q=${query}`,
    dataType: "json",
    method: "GET"
  }).then(res => {
    console.log(res);
//if no results found    
if (res.length === 0) {
  $(".imgContainer").html("");
   $(".subtitle").html("");
   $(".info").html("");
   $(".imgContainer").append(`
           <img src="./public/td.jpg" alt="Kent Brockman technical difficulties">
            <h3>0 Results Found. Please Search Another Term.</h3>`);
}
else {
    let episode = res[0].Episode;
    let timestamp = res[0].Timestamp;
     $(".imgContainer").html("");
     $(".imgContainer").append(`
           <img src="https://frinkiac.com/meme/${episode}/${timestamp}" alt="">`);
 $.ajax({
   url: `https://cors-anywhere.herokuapp.com/https://frinkiac.com/api/caption?e=${episode}&t=${timestamp}`,
   dataType: "json",
   method: "GET"
 }).then(res => {
   console.log(res);
   $(".subtitle").html("");
    $(".info").html("");
   $(".info").append(`<p>From: ${res.Episode.Title}</p>
   <p>Season ${res.Episode.Season} Episode #${res.Episode.EpisodeNumber}</p>
   <p>Originally Aired On ${res.Episode.OriginalAirDate}</p>
   <a href="${res.Episode.WikiLink}" target="_blank">More Info</a>
   `);
   res.Subtitles.forEach(function(subtitle) {
     console.log(subtitle.Content);
     $(".subtitle").append(`<p>-${subtitle.Content}</p>`);
   });
 }); 
}
  });
}; 


simpson.init = () => {
 $(".quoteBox").hide();

}



$(function() {

  simpson.init();
  
  $('form').on("submit", function(e){
      $(".quoteBox").show();
      e.preventDefault();
      simpson.querySearch();
      });

});

