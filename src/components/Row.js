import axios from '../axios'
import './Row.css'
import { useState, useEffect } from 'react'

function Row({ title, fetchUrl, isLargeRow=false }) {
    const [movies, setMovies] = useState([])
    const baseurl = 'https://image.tmdb.org/t/p/original/'

    useEffect(()=>{
        async function fetchData(){
            try{
                const res = await axios.get(fetchUrl)
                setMovies(res.data.results);
                return res
            }catch(error){
                console.error(error)
            }
        }
        fetchData()
    }, [fetchUrl])

  return (
    <div className="row">
        <h2>{ title }</h2>
        <div className="row__posters">
            { movies.map((movie)=>{ return(
                ((isLargeRow && movie.poster_path) || 
                    (!isLargeRow && movie.backdrop_path)) && (
                        <img
                    key={movie?.id}
                    className={`row__poster ${isLargeRow && 'row__posterLarge' }`}
                    src={`${baseurl}${
                        isLargeRow ? movie?.poster_path : movie.backdrop_path
                    }`}
                    alt={movie?.name}
                    />
                    )
                
            )}) }
        </div>
    </div>
  )
}

export default Row