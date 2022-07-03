import React, { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import "./css/style.css";
import axios from "axios";

const Temp = () => {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const apiKey = `e5a8127bbe60efcd32840ecdc64f9d1e`;
  const endPoint = `https://api.openweathermap.org/data/2.5/weather?`;
  const [weatherdetails, setweatherdetails] = useState(null);
  const date = new Date();
  const currentdate = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday'];
  const currentDay = date.getDay();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
    getCity();
  }, [lat, long]);

  const getCity = async () => {
    let finalendpoint = `${endPoint}lat=${lat}&lon=${long}&exclude=hourly,daily&appid=${apiKey}`;
    await axios.get(finalendpoint).then((response) => {
      // console.log(response.data);
      setweatherdetails(response.data);
    });
  };

  if (weatherdetails !== null) {
    return (
      <div className="box p-5">
        <div className="input login-wrap pt-1 text-center">
          <h2 className="text-white">{weatherdetails.name}</h2>
          <div className="d-flex mx-3 mt-4">
            <div>
              <h4 className="text-white  px-5"><span className="ms-2">{`${day[currentDay]}. ${currentdate}/${month}/${year}`}</span></h4>
              <h2 className="text-white px-5"><span className="ms-2" >{`${hour}:${minute}`}</span></h2>
            </div>
            <div className="text-white display-1">{Math.round(weatherdetails.main.temp / 10)}°<sup>c</sup></div>
            <div className="ms-4 px-5">
              {weatherdetails.weather[0].main === "Clouds" ?  <i className="fa-solid fa-3x text-white fa-cloud"></i>: weatherdetails.weather[0].main==="Sunny"?<i className="fa-solid fa-3x fa-cloud-sun text-white"></i>:<i className="fa-solid text-white fa-cloud-showers-heavy"></i>}
              <p className="text-white h4">Clear</p>
              </div>
          </div>
          <div className="d-flex text-white justify-content-center mt-4">
            <h4 className="mx-3">Max:<span>{Math.round(weatherdetails.main.temp_max / 10)}°</span></h4>
            <h4 className="ms-2">Min:<span>{Math.round(weatherdetails.main.temp_min / 10)}°</span></h4>
          </div>
          <div className="wind">
            <span className="text-white h4">Wind :</span>
            <span className="text-white h4">{weatherdetails.wind.speed} mi/h</span>
            <div className="d-flex justify-content-center">
            </div>
          </div>
        </div>
      </div>

    )
  }

};

export default Temp;
