"use-client";

import { Button } from "@/components/ui/button";
import { useDroneContext } from "@/context";
import { DroneIcon } from "@/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import { Drone } from "../../../types";

export const MapComponent = () => {
  const { drones } = useDroneContext();

  const [viewState, setViewState] = useState({
    longitude: 18.113851568887522,
    latitude: 59.34845824529293,
    zoom: 1,
  });

  const zoomOutMap = async () => {
    const { data } = await axios.get("http://localhost/boundary");

    setViewState({
      longitude: data.centerPoint.lon,
      latitude: data.centerPoint.lat,
      zoom: 1,
    });
  };

  const onDroneClick = (drone: Drone) => {
    setViewState({
      longitude: drone.position.lon,
      latitude: drone.position.lat,
      zoom: 13,
    });
  };

  useEffect(() => {
    zoomOutMap();
  }, []);

  return (
    <div className="max-w-6xl">
      <Map
        {...viewState}
        onMove={(e) => setViewState(e.viewState)}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_BOX_KEY_TOKEN}
        style={{ width: "100%", height: 750 }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
      >
        {drones.map((drone) => {
          return (
            <Marker
              key={drone.id}
              longitude={drone.position.lon}
              latitude={drone.position.lat}
            >
              <div onClick={() => onDroneClick(drone)}>
                <DroneIcon />
              </div>
            </Marker>
          );
        })}
      </Map>
      <Button className="mt-5 cursor-pointer" onClick={zoomOutMap}>
        Zoom out
      </Button>
    </div>
  );
};

{
}
