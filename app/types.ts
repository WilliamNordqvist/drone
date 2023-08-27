export type Drone = {
  id: number;
  name: string;
  description: string;
  position: {
    lat: number;
    lon: number;
  };
  speedMs: number;
  heading: number;
  heightMeters: number;
};
