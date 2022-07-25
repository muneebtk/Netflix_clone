import React from 'react'
import './Banner.css'
import {useEffect,useState} from 'react'
import axios from '../../axios'
import { API_KEY,ImageUrl } from '../../constants/constants'

function Banner() {
  const [Movie, setMovie] = useState()
  useEffect(() => {
      axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
        console.log(response.data.results[0])
        setMovie(response.data.results[1])
      })
   
  }, [])
  
  return (
    <div style={{backgroundImage: `url(${Movie ? ImageUrl+Movie.backdrop_path : ""})`}} className='banner'>
        <div className='content'>
            <h1 className='title'>{Movie ? Movie.title : ''}</h1>
            <div className='banner_buttons'>
                <button className='button'>Play</button>
                <button className='button'>My list</button>
            </div>
            <h1 className='description'>{Movie?Movie.overview : ''}</h1>
        </div>
        <div className="faded_bottom">
        </div>
    </div>
  )
}

export default Banner