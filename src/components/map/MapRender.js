import React, { useContext, useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import Settings from "../Settings"
import mapSyles from "./MapStyles"
import { LogContext } from '../divelog/DiveLogProvider';

export const MapRender =(props) => {
    const {diveLogs} = useContext(LogContext)
    const [latLong, setLatLong] = useState()
    

    
    useEffect(()=>{
        //Taking the logs and running them through API to get lat and lng for each location 
        let latLongs = []
        diveLogs.map(dl =>{
            return fetch(`http://api.positionstack.com/v1/forward?access_key=ff0fcd042ab984146219abc275c71e4b&query=${dl.location}&limit=1
            `)
                .then(res => res.json())
                .then(parsedRes => {
                    setLatLong( prevLatLongs => [...prevLatLongs ,parsedRes.data[0]] )
                    
                  })


        })
        setLatLong(latLongs)
        console.log(latLong)
    },[diveLogs])

// this returns several logs, the first of which are empty arrays and the last are correct with the data that I need
    

    


    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: Settings.apiKey
    })

    const mapContainerStyle = {
        width: '31rem',
        height: '24rem'
    }

    const center = {
        lat: 0,
        lng: 0
    }

    const options = {
        styles: mapSyles,
        disableDefaultUI: true
    }


    
    if (loadError) console.log("error loading maps")
    if (!isLoaded) return "Loading..."

    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                options={options}
                zoom={1}
                center={center}
            >
                
                {
                    //this is where I map through the state variable
                    latLong.map(l =>(
                     <Marker key={l.lat}
                         position ={{lat: l.latitude, lng: l.longitude}} 
                         />
                    ))
                }
            </GoogleMap>
        </div>
    )
}
