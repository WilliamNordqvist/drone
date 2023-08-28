"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Drone } from "../app/types";
import axios from "axios";

type DroneContextType = {
  drones: Drone[];
  deleteDrone: (id: number) => void;
  deleteDrones: (ids: number[]) => void;
};

const DroneContext = createContext<DroneContextType>({
  drones: [],
  deleteDrone: () => {},
  deleteDrones: () => {},
});

export const DroneContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [droneContextState, setDroneContextState] = useState<DroneContextType>({
    drones: [],
    deleteDrone: () => {},
    deleteDrones: () => {},
  });

  const getDrones = async () => {
    const { data } = await axios<[Drone]>("http://localhost/drones");
    return data;
  };

  //WebSocket
  useEffect(() => {
    // Create WebSocket connection
    const socket = new WebSocket("ws://localhost/ws");

    // Connection opened
    socket.addEventListener("open", function (event) {
      console.log("WebSocket is open now.");
    });

    // Listen for messages from server
    socket.addEventListener("message", function (event) {
      const drone = JSON.parse(event.data) as Drone;

      setDroneContextState((prev) => {
        const updatedDrones = prev.drones.map((d) => {
          if (d.id === drone.id) {
            return drone; // Update the existing drone
          }
          return d;
        });

        if (!updatedDrones.some((d) => d.id === drone.id)) {
          updatedDrones.push(drone); // Add the new drone
        }

        return {
          ...prev,
          drones: updatedDrones,
        };
      });
    });

    // Close WebSocket when component unmounts
    return () => {
      socket.close();
    };
  }, []);

  //Initial context setup
  useEffect(() => {
    // TODO BETTER ERROR CATHING

    setDroneContextState((pre) => ({
      ...pre!,

      deleteDrone: async (id: number) => {
        try {
          await axios.delete("http://localhost/drones/" + id);
          const drones = await getDrones();
          setDroneContextState({
            ...droneContextState,
            drones,
          });
        } catch (error) {
          alert("Something went wrong");
        }
      },

      deleteDrones: async (ids: number[]) => {
        console.log({ droneContextState });
        try {
          await Promise.all(
            ids.map((id) => axios.delete("http://localhost/drones/" + id))
          );

          const drones = await getDrones();
          setDroneContextState({
            ...droneContextState,
            drones,
          });
        } catch (error) {
          alert("Something went wrong");
        }
      },
    }));
  }, []);

  return (
    <DroneContext.Provider value={droneContextState}>
      {children}
    </DroneContext.Provider>
  );
};

export const useDroneContext = () => {
  return useContext(DroneContext);
};
