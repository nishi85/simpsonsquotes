(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

$(function () {
  $('.quoteBox').hide();
  //get input from search field
  function querySearch() {
    var query = $('input[type=search]').val();
    getQuote(query);
  }

  //search input in the API. Had to use proxy.
  function getQuote(query) {
    $.ajax({
      url: 'https://cors-anywhere.herokuapp.com/https://frinkiac.com/api/search?q=' + query,
      dataType: "json",
      method: "GET"
    }).then(function (res) {
      console.log(res);
      //if no results found    
      if (res.length === 0) {
        $(".imgContainer").html("");
        $(".subtitle").html("");
        $(".info").html("");
        $(".imgContainer").append('\n           <img src="./public/td.jpg" alt="Kent Brockman technical difficulties">\n            <h3>0 Results Found. Please Search Another Term.</h3>');
      } else {
        var episode = res[0].Episode;
        var timestamp = res[0].Timestamp;
        $(".imgContainer").html("");
        $(".imgContainer").append('\n           <img src="https://frinkiac.com/meme/' + episode + '/' + timestamp + '" alt="">');
        $.ajax({
          url: 'https://cors-anywhere.herokuapp.com/https://frinkiac.com/api/caption?e=' + episode + '&t=' + timestamp,
          dataType: "json",
          method: "GET"
        }).then(function (res) {
          console.log(res);
          $(".subtitle").html("");
          $(".info").html("");
          $(".info").append('<p>From: ' + res.Episode.Title + '</p>\n   <p>Season ' + res.Episode.Season + ' Episode #' + res.Episode.EpisodeNumber + '</p>\n   <p>Originally Aired On ' + res.Episode.OriginalAirDate + '</p>\n   <a href="' + res.Episode.WikiLink + '" target="_blank">More Info</a>\n   \n   \n   ');
          res.Subtitles.forEach(function (subtitle) {
            console.log(subtitle.Content);
            $(".subtitle").append('<p>-' + subtitle.Content + '</p>');
          });
        });
      }
    });
  };

  $('form').on("submit", function (e) {
    $(".quoteBox").show();
    e.preventDefault();
    querySearch();
  });
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL0RvY3VtZW50cy9wcm9qZWN0cy9zaW1wc29uc3F1b3RlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXZcXHNjcmlwdHNcXGFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQ0EsRUFBRSxZQUFXO0FBQ1gsSUFBRSxXQUFGLEVBQWUsSUFBZjtBQUNGO0FBQ0MsV0FBUyxXQUFULEdBQXVCO0FBQ3BCLFFBQUksUUFBUSxFQUFFLG9CQUFGLEVBQXdCLEdBQXhCLEVBQVo7QUFDQSxhQUFTLEtBQVQ7QUFDSDs7QUFFRDtBQUNFLFdBQVMsUUFBVCxDQUFrQixLQUFsQixFQUF5QjtBQUN6QixNQUFFLElBQUYsQ0FBTztBQUNMLHNGQUE4RSxLQUR6RTtBQUVMLGdCQUFVLE1BRkw7QUFHTCxjQUFRO0FBSEgsS0FBUCxFQUlHLElBSkgsQ0FJUSxlQUFPO0FBQ2IsY0FBUSxHQUFSLENBQVksR0FBWjtBQUNKO0FBQ0EsVUFBSSxJQUFJLE1BQUosS0FBZSxDQUFuQixFQUFzQjtBQUNwQixVQUFFLGVBQUYsRUFBbUIsSUFBbkIsQ0FBd0IsRUFBeEI7QUFDQyxVQUFFLFdBQUYsRUFBZSxJQUFmLENBQW9CLEVBQXBCO0FBQ0EsVUFBRSxPQUFGLEVBQVcsSUFBWCxDQUFnQixFQUFoQjtBQUNBLFVBQUUsZUFBRixFQUFtQixNQUFuQjtBQUdGLE9BUEQsTUFRSztBQUNELFlBQUksVUFBVSxJQUFJLENBQUosRUFBTyxPQUFyQjtBQUNBLFlBQUksWUFBWSxJQUFJLENBQUosRUFBTyxTQUF2QjtBQUNDLFVBQUUsZUFBRixFQUFtQixJQUFuQixDQUF3QixFQUF4QjtBQUNBLFVBQUUsZUFBRixFQUFtQixNQUFuQix1REFDNEMsT0FENUMsU0FDdUQsU0FEdkQ7QUFFSixVQUFFLElBQUYsQ0FBTztBQUNMLDJGQUErRSxPQUEvRSxXQUE0RixTQUR2RjtBQUVMLG9CQUFVLE1BRkw7QUFHTCxrQkFBUTtBQUhILFNBQVAsRUFJRyxJQUpILENBSVEsZUFBTztBQUNiLGtCQUFRLEdBQVIsQ0FBWSxHQUFaO0FBQ0EsWUFBRSxXQUFGLEVBQWUsSUFBZixDQUFvQixFQUFwQjtBQUNDLFlBQUUsT0FBRixFQUFXLElBQVgsQ0FBZ0IsRUFBaEI7QUFDRCxZQUFFLE9BQUYsRUFBVyxNQUFYLGVBQThCLElBQUksT0FBSixDQUFZLEtBQTFDLDJCQUNZLElBQUksT0FBSixDQUFZLE1BRHhCLGtCQUMyQyxJQUFJLE9BQUosQ0FBWSxhQUR2RCx3Q0FFeUIsSUFBSSxPQUFKLENBQVksZUFGckMsMEJBR1csSUFBSSxPQUFKLENBQVksUUFIdkI7QUFPQSxjQUFJLFNBQUosQ0FBYyxPQUFkLENBQXNCLFVBQVMsUUFBVCxFQUFtQjtBQUN2QyxvQkFBUSxHQUFSLENBQVksU0FBUyxPQUFyQjtBQUNBLGNBQUUsV0FBRixFQUFlLE1BQWYsVUFBNkIsU0FBUyxPQUF0QztBQUNELFdBSEQ7QUFJRCxTQW5CRDtBQW9CQTtBQUNFLEtBMUNEO0FBMkNEOztBQUdDLElBQUUsTUFBRixFQUFVLEVBQVYsQ0FBYSxRQUFiLEVBQXVCLFVBQVMsQ0FBVCxFQUFXO0FBQzlCLE1BQUUsV0FBRixFQUFlLElBQWY7QUFDQSxNQUFFLGNBQUY7QUFDQTtBQUNDLEdBSkw7QUFNRCxDQTlERCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcclxuJChmdW5jdGlvbigpIHtcclxuICAkKCcucXVvdGVCb3gnKS5oaWRlKCk7XHJcbi8vZ2V0IGlucHV0IGZyb20gc2VhcmNoIGZpZWxkXHJcbiBmdW5jdGlvbiBxdWVyeVNlYXJjaCgpIHtcclxuICAgIGxldCBxdWVyeSA9ICQoJ2lucHV0W3R5cGU9c2VhcmNoXScpLnZhbCgpO1xyXG4gICAgZ2V0UXVvdGUocXVlcnkpO1xyXG59XHJcblxyXG4vL3NlYXJjaCBpbnB1dCBpbiB0aGUgQVBJLiBIYWQgdG8gdXNlIHByb3h5LlxyXG4gIGZ1bmN0aW9uIGdldFF1b3RlKHF1ZXJ5KSB7XHJcbiAgJC5hamF4KHtcclxuICAgIHVybDogYGh0dHBzOi8vY29ycy1hbnl3aGVyZS5oZXJva3VhcHAuY29tL2h0dHBzOi8vZnJpbmtpYWMuY29tL2FwaS9zZWFyY2g/cT0ke3F1ZXJ5fWAsXHJcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICBtZXRob2Q6IFwiR0VUXCJcclxuICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4vL2lmIG5vIHJlc3VsdHMgZm91bmQgICAgXHJcbmlmIChyZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgJChcIi5pbWdDb250YWluZXJcIikuaHRtbChcIlwiKTtcclxuICAgJChcIi5zdWJ0aXRsZVwiKS5odG1sKFwiXCIpO1xyXG4gICAkKFwiLmluZm9cIikuaHRtbChcIlwiKTtcclxuICAgJChcIi5pbWdDb250YWluZXJcIikuYXBwZW5kKGBcclxuICAgICAgICAgICA8aW1nIHNyYz1cIi4vcHVibGljL3RkLmpwZ1wiIGFsdD1cIktlbnQgQnJvY2ttYW4gdGVjaG5pY2FsIGRpZmZpY3VsdGllc1wiPlxyXG4gICAgICAgICAgICA8aDM+MCBSZXN1bHRzIEZvdW5kLiBQbGVhc2UgU2VhcmNoIEFub3RoZXIgVGVybS48L2gzPmApO1xyXG59XHJcbmVsc2Uge1xyXG4gICAgbGV0IGVwaXNvZGUgPSByZXNbMF0uRXBpc29kZTtcclxuICAgIGxldCB0aW1lc3RhbXAgPSByZXNbMF0uVGltZXN0YW1wO1xyXG4gICAgICQoXCIuaW1nQ29udGFpbmVyXCIpLmh0bWwoXCJcIik7XHJcbiAgICAgJChcIi5pbWdDb250YWluZXJcIikuYXBwZW5kKGBcclxuICAgICAgICAgICA8aW1nIHNyYz1cImh0dHBzOi8vZnJpbmtpYWMuY29tL21lbWUvJHtlcGlzb2RlfS8ke3RpbWVzdGFtcH1cIiBhbHQ9XCJcIj5gKTtcclxuICQuYWpheCh7XHJcbiAgIHVybDogYGh0dHBzOi8vY29ycy1hbnl3aGVyZS5oZXJva3VhcHAuY29tL2h0dHBzOi8vZnJpbmtpYWMuY29tL2FwaS9jYXB0aW9uP2U9JHtlcGlzb2RlfSZ0PSR7dGltZXN0YW1wfWAsXHJcbiAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgbWV0aG9kOiBcIkdFVFwiXHJcbiB9KS50aGVuKHJlcyA9PiB7XHJcbiAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICQoXCIuc3VidGl0bGVcIikuaHRtbChcIlwiKTtcclxuICAgICQoXCIuaW5mb1wiKS5odG1sKFwiXCIpO1xyXG4gICAkKFwiLmluZm9cIikuYXBwZW5kKGA8cD5Gcm9tOiAke3Jlcy5FcGlzb2RlLlRpdGxlfTwvcD5cclxuICAgPHA+U2Vhc29uICR7cmVzLkVwaXNvZGUuU2Vhc29ufSBFcGlzb2RlICMke3Jlcy5FcGlzb2RlLkVwaXNvZGVOdW1iZXJ9PC9wPlxyXG4gICA8cD5PcmlnaW5hbGx5IEFpcmVkIE9uICR7cmVzLkVwaXNvZGUuT3JpZ2luYWxBaXJEYXRlfTwvcD5cclxuICAgPGEgaHJlZj1cIiR7cmVzLkVwaXNvZGUuV2lraUxpbmt9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+TW9yZSBJbmZvPC9hPlxyXG4gICBcclxuICAgXHJcbiAgIGApO1xyXG4gICByZXMuU3VidGl0bGVzLmZvckVhY2goZnVuY3Rpb24oc3VidGl0bGUpIHtcclxuICAgICBjb25zb2xlLmxvZyhzdWJ0aXRsZS5Db250ZW50KTtcclxuICAgICAkKFwiLnN1YnRpdGxlXCIpLmFwcGVuZChgPHA+LSR7c3VidGl0bGUuQ29udGVudH08L3A+YCk7XHJcbiAgIH0pO1xyXG4gfSk7IFxyXG59XHJcbiAgfSk7XHJcbn07IFxyXG5cclxuICBcclxuICAkKCdmb3JtJykub24oXCJzdWJtaXRcIiwgZnVuY3Rpb24oZSl7XHJcbiAgICAgICQoXCIucXVvdGVCb3hcIikuc2hvdygpO1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHF1ZXJ5U2VhcmNoKCk7XHJcbiAgICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG4iXX0=
