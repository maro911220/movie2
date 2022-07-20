const movieId = location.href.split('?')[1]
const movieDetail = document.querySelector('.movie-detail');
const apiKey = 'a1c341dcea4317b29e742a9114cb353f';
let movieItem , based,companies

function movieLoad() {
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=ko`)
        .then(function (res) {
            console.log(res.data)
            based = res.data
            if(based.production_companies){
                companies =`<div class="movie-detail-companies">
                                <h3 class="movie-detail-companies-title">companies</h3>
                                ${based.production_companies.map(a=> `<p>${a.name}</p>`).join('')}
                            </div>`
            }else{
                companies = ''
            }
            movieItem = `<div class="movie-detail-item">
                            <div class="movie-detail-bg-box">
                                <img class="movie-detail-bg" src="https://image.tmdb.org/t/p/original/${based.backdrop_path}" >
                            </div>
                
                            <div class="movie-detail-box">
                                <div class="movie-detail-title-box">
                                    <h2 class="movie-detail-title">${based.title}<span class="movie-detail-tag">${based.tagline}</span></h2>
                                    <p class="movie-detail-en">${based.original_title}</p>
                                    <p class="movie-detail-category">카테고리: ${based.genres.map(a=> `<span>${a.name}</span>`).join('')}</p>
                                    <p class="movie-detail-score">평점: ${based.vote_average}</p>
                                    <p class="movie-detail-date">개봉일: ${based.release_date}</p>
                                    <p class="movie-detail-over">${based.overview}</p>
                                </div>
                                ${companies}
                            </div>
                        </div>`

            

            movieDetail.innerHTML = movieItem
        })
        .catch(function (err) {
            console.log(err)
        })
}
movieLoad();

document.querySelector('.movie-search').style.display = 'none';