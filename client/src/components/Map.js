import ReactMapGL, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'


  //map

  const [viewPort, setViewPort] = useState(null)

  useEffect(() => {

    window.navigator.geolocation.getCurrentPosition(position => {
      const { longitude, latitude } = position.coords
      setViewPort({ longitude, latitude })

    })
  }, [])


<div  className='map-container'></div>
{viewPort ?
  <ReactMapGL
    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    height='100%'
    width='100%'
    mapStyle='mapbox://styles/mapbox/streets-v11'

    {...viewPort}
    onViewportChange={(viewPort) => setViewPort(viewPort)}
  >

<Marker key={photo._id} longitude={photo.location.longitude} latitude={photo.location.latitude}>
                {/* <span onClick={() => setPopup(location)}> */}
                {photo.location.icon}
                {/* </span> */}
              </Marker>
            })}

          </ReactMapGL>
          :
          <h1>Loading your location...</h1>
        }

        {/* {popup &&
        <Popup
          latitude={popup.latitude}
          longitude={popup.longitude}
          closeOnClick={true}
          onClose={() => setPopup(null)}
        >
          <div>{popup.title}</div>
          <img key={popup._id} className='photo-userprofile' src={popup.image} alt={popup.title} />
        </Popup>
      } */} 

        // const [likePhoto, setLikePhoto] = useState('')
  const [FormData, setFormdata] = useState({
    like: true
  })
  console.log(setFormdata)
  const [toggleForLike, setToggleForLike] = useState(false)
  const handleLike = async event => {
    if (toggleForLike === false) {
      console.log('POST ME', event.target.name)
      const token = window.localStorage.getItem('token')
      // setLikePhoto(event.target.name)
      const setData = await axios.post(`/api/profiles/${id}/photos/6062044671b2ed3c86db142a/likes`, FormData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      console.log(setData)
      console.log('im senind DSATAAA')
      setToggleForLike(true)
      console.log(toggleForLike)
    } else {
      console.log('DELETE ME', event.target.name)
      // const token = window.localStorage.getItem('token')
      const getLikesFromApi = await axios.get(`/api/profiles/${id}`)
      // const photoToMapLikes = getLikesFromApi.data.photos[event.target.value]
      console.log('>>>>>', getLikesFromApi)
      // setLikePhoto(event.target.name)

      // await axios.delete(`/api/profiles/${id}/photos/${likePhoto}/likes/`, FormData,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`
      //     }
      //   })
      setToggleForLike(false)
    }

  }


