import { DroneContextProvider } from "@/context";
import { LogoIcon } from "@/icons";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DroneContextProvider>
      <div className="h-full p-5 bg-[#FCF9F7]">
        <div className="mb-10 w-[150px]">
          <LogoIcon color="black" />
        </div>
        {children}
      </div>
    </DroneContextProvider>
  );
}
