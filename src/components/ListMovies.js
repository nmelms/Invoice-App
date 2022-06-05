import React, {useEffect, useState} from 'react'
import {collection, getDocs} from 'firebase/firestore'
import { db } from '../firebase.js'


export default function ListMovies() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    getMovies()

  }, [])

  const getMovies = () => {
    const movieCollectionRef =  collection(db, 'form')
    getDocs(movieCollectionRef).then(res => {
      const movies = res.docs.map(doc => ({
        data: doc.data(), 
        id: doc.id,
      }))
      console.log(movies)

    }).catch(error => console.log('error'))

  }

  return (
    <div>
      <h4>ListMovies</h4>
      </div>
  )
}
