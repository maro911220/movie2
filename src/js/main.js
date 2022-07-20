let pageNum = 0;
let movieItem, based, getLink, movieSearchValue, lastMovieItem
let checked = true;
const apiKey = 'a1c341dcea4317b29e742a9114cb353f';
const movieSearchBtn = document.querySelector('.movie-search');
const movieList = document.querySelector('.movie-list');

function createItem() {
    movieItem = ` <li class="movie-item">
                                        <a class="movie-link" href="./sub.html?${based.id}">
                                            <div class="movie-poster-box">
                                            <img class="movie-poster" src="https://image.tmdb.org/t/p/w500/${based.poster_path}" >
                                            </div>
                                            <div class="movie-box">
                                                <div class="movie-title-box">
                                                    <h3 class="movie-title">${based.title}</h3>
                                                    <p class="movie-title-en">${based.original_title}</p>
                                                    <p class="movie-date">${based.release_date}</p>
                                                </div>
                                                <div class="movie-dec">
                                                    <p>${based.overview}</p>
                                                </div>
                                                
                                            </div>
                                        </a>
                                    </li>`

    movieList.innerHTML += movieItem
}

function movieLoad() {
    pageNum++
    if (checked == true) {
        getLink = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko&page=${pageNum}`
    } else {
        getLink = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=ko&query=${movieSearchValue}&page=${pageNum}`
    }
    axios.get(getLink)
        .then(function (res) {
            if (res.data.results.length > 0) {
                if (checked == false) {
                    if (pageNum == 1) {
                        window.scrollTo({
                            top: 0
                        })
                        document.querySelectorAll('.movie-item').forEach(a => a.remove());
                    }
                }

                for (let i = 0; i < res.data.results.length; i++) {
                    if (checked == true) {
                        based = res.data.results[i]
                        createItem(based)
                    } else {
                        based = res.data.results[i]
                        createItem(based)
                    }
                }
            } else {
                alert('결과가 없습니다.')
            }

        })
        .catch(function (err) {
            console.log(err)
        })
}
movieLoad();

// 더보기
const Btns = document.querySelector('.movie-btn')
Btns.addEventListener('click', function (e) {
    e.preventDefault();
    movieLoad();
})

// 검색기능
movieSearchBtn.addEventListener('submit', function (e) {
    e.preventDefault();
    movieSearchValue = document.querySelector('.movie-input').value
    if (movieSearchValue == '') {
        alert('한글자 이상 입력해주세요')
    } else {
        checked = false;
        pageNum = 0;
        movieLoad();
    }
})

// top
document.querySelector('.top-btn').addEventListener('click',function(e){
    e.preventDefault();
    window.scrollTo({top:0,behavior: 'smooth'})
})