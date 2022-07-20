(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var movieId = location.href.split('?')[1];
var movieDetail = document.querySelector('.movie-detail');
var apiKey = 'a1c341dcea4317b29e742a9114cb353f';
var movieItem, based, companies;

function movieLoad() {
  axios.get("https://api.themoviedb.org/3/movie/".concat(movieId, "?api_key=").concat(apiKey, "&language=ko")).then(function (res) {
    console.log(res.data);
    based = res.data;

    if (based.production_companies) {
      companies = "<div class=\"movie-detail-companies\">\n                                <h3 class=\"movie-detail-companies-title\">companies</h3>\n                                ".concat(based.production_companies.map(function (a) {
        return "<p>".concat(a.name, "</p>");
      }).join(''), "\n                            </div>");
    } else {
      companies = '';
    }

    movieItem = "<div class=\"movie-detail-item\">\n                            <div class=\"movie-detail-bg-box\">\n                                <img class=\"movie-detail-bg\" src=\"https://image.tmdb.org/t/p/original/".concat(based.backdrop_path, "\" >\n                            </div>\n                \n                            <div class=\"movie-detail-box\">\n                                <div class=\"movie-detail-title-box\">\n                                    <h2 class=\"movie-detail-title\">").concat(based.title, "<span class=\"movie-detail-tag\">").concat(based.tagline, "</span></h2>\n                                    <p class=\"movie-detail-en\">").concat(based.original_title, "</p>\n                                    <p class=\"movie-detail-category\">\uCE74\uD14C\uACE0\uB9AC: ").concat(based.genres.map(function (a) {
      return "<span>".concat(a.name, "</span>");
    }).join(''), "</p>\n                                    <p class=\"movie-detail-score\">\uD3C9\uC810: ").concat(based.vote_average, "</p>\n                                    <p class=\"movie-detail-date\">\uAC1C\uBD09\uC77C: ").concat(based.release_date, "</p>\n                                    <p class=\"movie-detail-over\">").concat(based.overview, "</p>\n                                </div>\n                                ").concat(companies, "\n                            </div>\n                        </div>");
    movieDetail.innerHTML = movieItem;
  })["catch"](function (err) {
    console.log(err);
  });
}

movieLoad();
document.querySelector('.movie-search').style.display = 'none';

},{}]},{},[1]);
