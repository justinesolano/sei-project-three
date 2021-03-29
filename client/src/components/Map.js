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