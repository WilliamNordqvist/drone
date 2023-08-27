import { DroneContextProvider } from "@/context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DroneContextProvider>
      <div className="h-full p-5 bg-[#FFFEF7]">{children}</div>
    </DroneContextProvider>
  );
}
