import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import FilItem from '../../components/FilItem';

function NowPlaying() {
  const navigate = useNavigate()
  const [filmList, setFilmList] = useState([])
  useEffect(() => {
    axios({
      method: 'get',
      url: './films.json',
    }).then(res => {
      setFilmList(res.data)
    }).catch(error => {
      console.error(error);
    })


  }, [])
const filmClickHandler = (film) => { 
  // url传参
  // navigate(`/detail?id=${film.id}`)
  // 路由传参
  navigate(`/detail/${film.id}`)
 }
  return (
    <div>
      <ul>
        {
          filmList.length && filmList.map(filmItem=>{
            return (
              // <li key={filmItem.id} onClick={() => { filmClickHandler(filmItem) }}>{filmItem.filmName}</li>
              <FilItem key={filmItem.id} {...filmItem} ></FilItem>
            )
          })
        }
      </ul>
    </div>
  )
}

export default NowPlaying
