"use client";

import { useEffect, useState } from "react";
import { Drone } from "../../../types";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BackIcon } from "@/icons";

export default function EditDrone({
  params: { id },
}: {
  params: { id: string };
}) {
  const [drone, setDrone] = useState<Drone>();
  const router = useRouter();

  useEffect(() => {
    const getDrone = async () => {
      try {
        const { data } = await axios<Drone>("http://localhost/drones/" + id);
        setDrone(data);
      } catch (error) {
        router.push("/dashboard");
      }
    };
    getDrone();
  }, []);

  if (!drone) return <h1>Loading...</h1>;

  const onDroneChange = (newValue: Partial<Drone>) => {
    const [key, value] = Object.entries(newValue)[0];

    setDrone((pre) => ({ ...pre!, [key]: value }));
  };

  const onSubmit = async (e: any) => {
    try {
      e.preventDefault();
      await axios.put("http://localhost/drones/" + id, drone);
      router.push("/dashboard");
    } catch (error) {
      alert("Something went wrong");
    }
  };

  //TODO ADD REACT FORM AND ZOD

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div
        onClick={() => router.back()}
        className="absolute top-3 right-3 cursor-pointer"
      >
        <BackIcon />
      </div>
      <h2 className=" text-center w-full text-3xl font-bold tracking-tight mb-4">
        Edit Drone
      </h2>
      <form
        className="bg-white border border-1 px-5 py-7 shadow-md"
        onSubmit={onSubmit}
      >
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-3">
          <Label htmlFor="name">Name</Label>
          <Input
            className="bg-white shadow-lg"
            type="text"
            id="name"
            placeholder="Name"
            value={drone.name}
            onChange={(e) => onDroneChange({ name: e.target.value })}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-3">
          <Label htmlFor="id">ID</Label>
          <Input
            className="bg-white shadow-lg"
            type="number"
            id="id"
            disabled
            placeholder="ID"
            value={drone.id}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-3">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            className="bg-white shadow-lg h-20"
            placeholder="Type your description here."
            value={drone.description}
            onChange={(e) => onDroneChange({ description: e.target.value })}
          />
        </div>

        <div className=" flex w-full max-w-xl space-x-3 mb-3">
          <div className="w-full">
            <Label htmlFor="lat">Latitude</Label>
            <Input
              className="bg-white shadow-lg"
              type="number"
              id="lat"
              disabled
              placeholder="Latitude"
              value={drone.position.lat}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="lon">Longitude</Label>
            <Input
              className="bg-white shadow-lg"
              type="number"
              id="lon"
              disabled
              placeholder="Longitude"
              value={drone.position.lon}
            />
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5 mb-3">
          <Label htmlFor="speed">Speed MS</Label>
          <Input
            className="bg-white shadow-lg"
            type="number"
            id="speed"
            placeholder="SpeedMS"
            value={drone.speedMs}
            onChange={(e) => onDroneChange({ speedMs: Number(e.target.value) })}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-3">
          <Label htmlFor="heading">Heading</Label>
          <Input
            className="bg-white shadow-lg"
            type="number"
            id="heading"
            placeholder="heading"
            value={drone.heading}
            onChange={(e) => onDroneChange({ heading: Number(e.target.value) })}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-3">
          <Label htmlFor="heightMeters">HeightMeters</Label>
          <Input
            className="bg-white shadow-lg"
            type="number"
            id="heightMeters"
            placeholder="HeightMeters"
            value={drone.heightMeters}
            onChange={(e) =>
              onDroneChange({ heightMeters: Number(e.target.value) })
            }
          />
        </div>

        <Button className="w-full mt-5 " type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
