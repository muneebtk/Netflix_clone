import React, { useEffect } from 'react'
import './Rowpost.css'
import axios from '../../axios'
import { ImageUrl,API_KEY } from '../../constants/constants'
import { useState } from 'react'
import YouTube from 'react-youtube'

function Rowpost(props) {
  const [Movies,setMovies]=useState([])
  const [urlId,seturlId]=useState('')
  useEffect(() => {
   axios.get(props.url).then(response=>{
   console.log(response.data)
   setMovies(response.data.results)
  }
  )}, [])

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };
  const handleMovie = (id)=>{
  axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
    if (response.data.results.length!==0){
      seturlId(response.data.results[0])
    }else{
      console.log('array is empty')
    }
  })
  }
  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className='posters'>
          {Movies.map((obj)=>          
            <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ? 'smallPoster' : 'poster'} src={`${ImageUrl+obj.backdrop_path}`} alt="poster" />
            )}
        </div>
       { urlId && <YouTube opts={opts} videoId={urlId.key} /> }
    </div>
  )
}
export default Rowpost

