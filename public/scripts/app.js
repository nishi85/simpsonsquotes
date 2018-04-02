(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var simpson = {};

//get input from search field
simpson.querySearch = function () {
  var query = $('input[type=search]').val();
  simpson.getQuote(query);
};

//search input in the API. Had to use proxy.
simpson.getQuote = function (query) {
  $.ajax({
    url: "https://cors-anywhere.herokuapp.com/https://frinkiac.com/api/search?q=" + query,
    dataType: "json",
    method: "GET"
  }).then(function (res) {
    console.log(res);
    //if no results found    
    if (res.length === 0) {
      $(".imgContainer").html("");
      $(".subtitle").html("");
      $(".info").html("");
      $(".imgContainer").append("\n           <img src=\"./public/td.jpg\" alt=\"Kent Brockman technical difficulties\">\n            <h3>0 Results Found. Please Search Another Term.</h3>");
    } else {
      var episode = res[0].Episode;
      var timestamp = res[0].Timestamp;
      $(".imgContainer").html("");
      $(".imgContainer").append("\n           <img src=\"https://frinkiac.com/meme/" + episode + "/" + timestamp + "\" alt=\"\">");
      $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://frinkiac.com/api/caption?e=" + episode + "&t=" + timestamp,
        dataType: "json",
        method: "GET"
      }).then(function (res) {
        console.log(res);
        $(".subtitle").html("");
        $(".info").html("");
        $(".info").append("<p>From: " + res.Episode.Title + "</p>\n   <p>Season " + res.Episode.Season + " Episode #" + res.Episode.EpisodeNumber + "</p>\n   <p>Originally Aired On " + res.Episode.OriginalAirDate + "</p>\n   <a href=\"" + res.Episode.WikiLink + "\" target=\"_blank\">More Info</a>\n   ");
        res.Subtitles.forEach(function (subtitle) {
          console.log(subtitle.Content);
          $(".subtitle").append("<p>-" + subtitle.Content + "</p>");
        });
      });
    }
  });
};

simpson.init = function () {
  $(".quoteBox").hide();
};

$(function () {

  simpson.init();

  $('form').on("submit", function (e) {
    $(".quoteBox").show();
    e.preventDefault();
    simpson.querySearch();
  });
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL0RvY3VtZW50cy9wcm9qZWN0cy9zaW1wc29uc3F1b3RlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXZcXHNjcmlwdHNcXGFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBTSxVQUFVLEVBQWhCOztBQUVBO0FBQ0MsUUFBUSxXQUFSLEdBQXNCLFlBQU07QUFDekIsTUFBSSxRQUFRLEVBQUUsb0JBQUYsRUFBd0IsR0FBeEIsRUFBWjtBQUNBLFVBQVEsUUFBUixDQUFpQixLQUFqQjtBQUNILENBSEE7O0FBS0Q7QUFDRSxRQUFRLFFBQVIsR0FBbUIsVUFBQyxLQUFELEVBQVc7QUFDOUIsSUFBRSxJQUFGLENBQU87QUFDTCxvRkFBOEUsS0FEekU7QUFFTCxjQUFVLE1BRkw7QUFHTCxZQUFRO0FBSEgsR0FBUCxFQUlHLElBSkgsQ0FJUSxlQUFPO0FBQ2IsWUFBUSxHQUFSLENBQVksR0FBWjtBQUNKO0FBQ0EsUUFBSSxJQUFJLE1BQUosS0FBZSxDQUFuQixFQUFzQjtBQUNwQixRQUFFLGVBQUYsRUFBbUIsSUFBbkIsQ0FBd0IsRUFBeEI7QUFDQyxRQUFFLFdBQUYsRUFBZSxJQUFmLENBQW9CLEVBQXBCO0FBQ0EsUUFBRSxPQUFGLEVBQVcsSUFBWCxDQUFnQixFQUFoQjtBQUNBLFFBQUUsZUFBRixFQUFtQixNQUFuQjtBQUdGLEtBUEQsTUFRSztBQUNELFVBQUksVUFBVSxJQUFJLENBQUosRUFBTyxPQUFyQjtBQUNBLFVBQUksWUFBWSxJQUFJLENBQUosRUFBTyxTQUF2QjtBQUNDLFFBQUUsZUFBRixFQUFtQixJQUFuQixDQUF3QixFQUF4QjtBQUNBLFFBQUUsZUFBRixFQUFtQixNQUFuQix3REFDNEMsT0FENUMsU0FDdUQsU0FEdkQ7QUFFSixRQUFFLElBQUYsQ0FBTztBQUNMLHlGQUErRSxPQUEvRSxXQUE0RixTQUR2RjtBQUVMLGtCQUFVLE1BRkw7QUFHTCxnQkFBUTtBQUhILE9BQVAsRUFJRyxJQUpILENBSVEsZUFBTztBQUNiLGdCQUFRLEdBQVIsQ0FBWSxHQUFaO0FBQ0EsVUFBRSxXQUFGLEVBQWUsSUFBZixDQUFvQixFQUFwQjtBQUNDLFVBQUUsT0FBRixFQUFXLElBQVgsQ0FBZ0IsRUFBaEI7QUFDRCxVQUFFLE9BQUYsRUFBVyxNQUFYLGVBQThCLElBQUksT0FBSixDQUFZLEtBQTFDLDJCQUNZLElBQUksT0FBSixDQUFZLE1BRHhCLGtCQUMyQyxJQUFJLE9BQUosQ0FBWSxhQUR2RCx3Q0FFeUIsSUFBSSxPQUFKLENBQVksZUFGckMsMkJBR1csSUFBSSxPQUFKLENBQVksUUFIdkI7QUFLQSxZQUFJLFNBQUosQ0FBYyxPQUFkLENBQXNCLFVBQVMsUUFBVCxFQUFtQjtBQUN2QyxrQkFBUSxHQUFSLENBQVksU0FBUyxPQUFyQjtBQUNBLFlBQUUsV0FBRixFQUFlLE1BQWYsVUFBNkIsU0FBUyxPQUF0QztBQUNELFNBSEQ7QUFJRCxPQWpCRDtBQWtCQTtBQUNFLEdBeENEO0FBeUNELENBMUNDOztBQTZDRixRQUFRLElBQVIsR0FBZSxZQUFNO0FBQ3BCLElBQUUsV0FBRixFQUFlLElBQWY7QUFFQSxDQUhEOztBQU9BLEVBQUUsWUFBVzs7QUFFWCxVQUFRLElBQVI7O0FBRUEsSUFBRSxNQUFGLEVBQVUsRUFBVixDQUFhLFFBQWIsRUFBdUIsVUFBUyxDQUFULEVBQVc7QUFDOUIsTUFBRSxXQUFGLEVBQWUsSUFBZjtBQUNBLE1BQUUsY0FBRjtBQUNBLFlBQVEsV0FBUjtBQUNDLEdBSkw7QUFNRCxDQVZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNvbnN0IHNpbXBzb24gPSB7fTtcclxuXHJcbi8vZ2V0IGlucHV0IGZyb20gc2VhcmNoIGZpZWxkXHJcbiBzaW1wc29uLnF1ZXJ5U2VhcmNoID0gKCkgPT4ge1xyXG4gICAgbGV0IHF1ZXJ5ID0gJCgnaW5wdXRbdHlwZT1zZWFyY2hdJykudmFsKCk7XHJcbiAgICBzaW1wc29uLmdldFF1b3RlKHF1ZXJ5KTtcclxufVxyXG5cclxuLy9zZWFyY2ggaW5wdXQgaW4gdGhlIEFQSS4gSGFkIHRvIHVzZSBwcm94eS5cclxuICBzaW1wc29uLmdldFF1b3RlID0gKHF1ZXJ5KSA9PiB7XHJcbiAgJC5hamF4KHtcclxuICAgIHVybDogYGh0dHBzOi8vY29ycy1hbnl3aGVyZS5oZXJva3VhcHAuY29tL2h0dHBzOi8vZnJpbmtpYWMuY29tL2FwaS9zZWFyY2g/cT0ke3F1ZXJ5fWAsXHJcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICBtZXRob2Q6IFwiR0VUXCJcclxuICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4vL2lmIG5vIHJlc3VsdHMgZm91bmQgICAgXHJcbmlmIChyZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgJChcIi5pbWdDb250YWluZXJcIikuaHRtbChcIlwiKTtcclxuICAgJChcIi5zdWJ0aXRsZVwiKS5odG1sKFwiXCIpO1xyXG4gICAkKFwiLmluZm9cIikuaHRtbChcIlwiKTtcclxuICAgJChcIi5pbWdDb250YWluZXJcIikuYXBwZW5kKGBcclxuICAgICAgICAgICA8aW1nIHNyYz1cIi4vcHVibGljL3RkLmpwZ1wiIGFsdD1cIktlbnQgQnJvY2ttYW4gdGVjaG5pY2FsIGRpZmZpY3VsdGllc1wiPlxyXG4gICAgICAgICAgICA8aDM+MCBSZXN1bHRzIEZvdW5kLiBQbGVhc2UgU2VhcmNoIEFub3RoZXIgVGVybS48L2gzPmApO1xyXG59XHJcbmVsc2Uge1xyXG4gICAgbGV0IGVwaXNvZGUgPSByZXNbMF0uRXBpc29kZTtcclxuICAgIGxldCB0aW1lc3RhbXAgPSByZXNbMF0uVGltZXN0YW1wO1xyXG4gICAgICQoXCIuaW1nQ29udGFpbmVyXCIpLmh0bWwoXCJcIik7XHJcbiAgICAgJChcIi5pbWdDb250YWluZXJcIikuYXBwZW5kKGBcclxuICAgICAgICAgICA8aW1nIHNyYz1cImh0dHBzOi8vZnJpbmtpYWMuY29tL21lbWUvJHtlcGlzb2RlfS8ke3RpbWVzdGFtcH1cIiBhbHQ9XCJcIj5gKTtcclxuICQuYWpheCh7XHJcbiAgIHVybDogYGh0dHBzOi8vY29ycy1hbnl3aGVyZS5oZXJva3VhcHAuY29tL2h0dHBzOi8vZnJpbmtpYWMuY29tL2FwaS9jYXB0aW9uP2U9JHtlcGlzb2RlfSZ0PSR7dGltZXN0YW1wfWAsXHJcbiAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgbWV0aG9kOiBcIkdFVFwiXHJcbiB9KS50aGVuKHJlcyA9PiB7XHJcbiAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICQoXCIuc3VidGl0bGVcIikuaHRtbChcIlwiKTtcclxuICAgICQoXCIuaW5mb1wiKS5odG1sKFwiXCIpO1xyXG4gICAkKFwiLmluZm9cIikuYXBwZW5kKGA8cD5Gcm9tOiAke3Jlcy5FcGlzb2RlLlRpdGxlfTwvcD5cclxuICAgPHA+U2Vhc29uICR7cmVzLkVwaXNvZGUuU2Vhc29ufSBFcGlzb2RlICMke3Jlcy5FcGlzb2RlLkVwaXNvZGVOdW1iZXJ9PC9wPlxyXG4gICA8cD5PcmlnaW5hbGx5IEFpcmVkIE9uICR7cmVzLkVwaXNvZGUuT3JpZ2luYWxBaXJEYXRlfTwvcD5cclxuICAgPGEgaHJlZj1cIiR7cmVzLkVwaXNvZGUuV2lraUxpbmt9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+TW9yZSBJbmZvPC9hPlxyXG4gICBgKTtcclxuICAgcmVzLlN1YnRpdGxlcy5mb3JFYWNoKGZ1bmN0aW9uKHN1YnRpdGxlKSB7XHJcbiAgICAgY29uc29sZS5sb2coc3VidGl0bGUuQ29udGVudCk7XHJcbiAgICAgJChcIi5zdWJ0aXRsZVwiKS5hcHBlbmQoYDxwPi0ke3N1YnRpdGxlLkNvbnRlbnR9PC9wPmApO1xyXG4gICB9KTtcclxuIH0pOyBcclxufVxyXG4gIH0pO1xyXG59OyBcclxuXHJcblxyXG5zaW1wc29uLmluaXQgPSAoKSA9PiB7XHJcbiAkKFwiLnF1b3RlQm94XCIpLmhpZGUoKTtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuJChmdW5jdGlvbigpIHtcclxuXHJcbiAgc2ltcHNvbi5pbml0KCk7XHJcbiAgXHJcbiAgJCgnZm9ybScpLm9uKFwic3VibWl0XCIsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAkKFwiLnF1b3RlQm94XCIpLnNob3coKTtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBzaW1wc29uLnF1ZXJ5U2VhcmNoKCk7XHJcbiAgICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG4iXX0=
