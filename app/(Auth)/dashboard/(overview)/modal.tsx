"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Drone } from "../../../types";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { uuid } from "@/lib/utils";

export function Modal() {
  const [drone, setDrone] = useState<Drone>({
    id: uuid(),
    name: "",
    description: "",
    position: {
      lat: 0,
      lon: 0,
    },
    speedMs: 0,
    heading: 0,
    heightMeters: 0,
  });

  const onDroneChange = (droneValue: Partial<Drone>) => {
    const [key, value] = Object.entries(droneValue)[0];
    setDrone((pre) => ({ ...pre!, [key]: value }));
    localStorage.setItem("new-drones", JSON.stringify(drone));
  };

  const onSave = async () => {
    try {
      await axios.post("http://localhost/drones", drone);
      localStorage.removeItem("new-drones");
    } catch (error: any) {
      //TODO SHOULD NOT CLOSE MODAL
      alert(error.response.data);
    }
  };

  useEffect(() => {
    const newDrone = localStorage.getItem("new-drones");
    if (newDrone) {
      setDrone(JSON.parse(newDrone));
    }
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-black text-white shadow-lg w-36"
        >
          New Drone
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full md:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New Drone</DialogTitle>
          <DialogDescription>
            Add a new drone here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSave}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Name"
                value={drone?.name}
                className="col-span-3"
                onChange={(e) => onDroneChange({ name: e.target.value.trim() })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                className="col-span-3 h-20"
                placeholder="Type your description here."
                value={drone?.description}
                onChange={(e) => onDroneChange({ description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="latitude" className="text-right">
                Latitude
              </Label>
              <Input
                id="latitude"
                value={drone?.position.lat || 0}
                className="col-span-3"
                onChange={(e) =>
                  onDroneChange({
                    position: {
                      lat: Number(e.target.value),
                      lon: drone?.position.lon || 0,
                    },
                  })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="longitude" className="text-right">
                Longitude
              </Label>
              <Input
                id="longitude"
                value={drone?.position.lon || 0}
                className="col-span-3"
                onChange={(e) =>
                  onDroneChange({
                    position: {
                      lat: drone?.position.lat || 0,
                      lon: Number(e.target.value),
                    },
                  })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="speedMs" className="text-right">
                SpeedMs
              </Label>
              <Input
                type="number"
                id="speedMs"
                value={drone?.speedMs}
                className="col-span-3"
                onChange={(e) =>
                  onDroneChange({ speedMs: Number(e.target.value) })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="heading" className="text-right">
                Heading
              </Label>
              <Input
                type="number"
                id="heading"
                value={drone?.heading}
                className="col-span-3"
                onChange={(e) =>
                  onDroneChange({ heading: Number(e.target.value) })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="heightMeters" className="text-right">
                HeightMeters
              </Label>
              <Input
                type="number"
                id="heightMeters"
                value={drone?.heightMeters}
                className="col-span-3"
                onChange={(e) =>
                  onDroneChange({ heightMeters: Number(e.target.value) })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
