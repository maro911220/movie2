(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var pageNum = 0;
var movieItem, based, getLink, movieSearchValue, lastMovieItem;
var checked = true;
var apiKey = 'a1c341dcea4317b29e742a9114cb353f';
var movieSearchBtn = document.querySelector('.movie-search');
var movieList = document.querySelector('.movie-list');

function createItem() {
  movieItem = " <li class=\"movie-item\">\n                                        <a class=\"movie-link\" href=\"./sub.html?".concat(based.id, "\">\n                                            <div class=\"movie-poster-box\">\n                                            <img class=\"movie-poster\" src=\"https://image.tmdb.org/t/p/w500/").concat(based.poster_path, "\" >\n                                            </div>\n                                            <div class=\"movie-box\">\n                                                <div class=\"movie-title-box\">\n                                                    <h3 class=\"movie-title\">").concat(based.title, "</h3>\n                                                    <p class=\"movie-title-en\">").concat(based.original_title, "</p>\n                                                    <p class=\"movie-date\">").concat(based.release_date, "</p>\n                                                </div>\n                                                <div class=\"movie-dec\">\n                                                    <p>").concat(based.overview, "</p>\n                                                </div>\n                                                \n                                            </div>\n                                        </a>\n                                    </li>");
  movieList.innerHTML += movieItem;
}

function movieLoad() {
  pageNum++;

  if (checked == true) {
    getLink = "https://api.themoviedb.org/3/movie/popular?api_key=".concat(apiKey, "&language=ko&page=").concat(pageNum);
  } else {
    getLink = "https://api.themoviedb.org/3/search/movie?api_key=".concat(apiKey, "&language=ko&query=").concat(movieSearchValue, "&page=").concat(pageNum);
  }

  axios.get(getLink).then(function (res) {
    if (res.data.results.length > 0) {
      if (checked == false) {
        if (pageNum == 1) {
          window.scrollTo({
            top: 0
          });
          document.querySelectorAll('.movie-item').forEach(function (a) {
            return a.remove();
          });
        }
      }

      for (var i = 0; i < res.data.results.length; i++) {
        if (checked == true) {
          based = res.data.results[i];
          createItem(based);
        } else {
          based = res.data.results[i];
          createItem(based);
        }
      }
    } else {
      alert('결과가 없습니다.');
    }
  })["catch"](function (err) {
    console.log(err);
  });
}

movieLoad(); // 더보기

var Btns = document.querySelector('.movie-btn');
Btns.addEventListener('click', function (e) {
  e.preventDefault();
  movieLoad();
}); // 검색기능

movieSearchBtn.addEventListener('submit', function (e) {
  e.preventDefault();
  movieSearchValue = document.querySelector('.movie-input').value;

  if (movieSearchValue == '') {
    alert('한글자 이상 입력해주세요');
  } else {
    checked = false;
    pageNum = 0;
    movieLoad();
  }
}); // top

document.querySelector('.top-btn').addEventListener('click', function (e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

},{}]},{},[1]);
