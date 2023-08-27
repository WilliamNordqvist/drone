"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Overview } from "./(overview)/overview";
import { MapComponent } from "./(map)/map";

enum EnumTabTypes {
  OVERVIEW = "overview",
  MAP = "map",
}

export default function Dashboard() {
  return (
    <Tabs defaultValue={EnumTabTypes.OVERVIEW}>
      <TabsList className="mb-10">
        <TabsTrigger value={EnumTabTypes.OVERVIEW}>Overview</TabsTrigger>
        <TabsTrigger value={EnumTabTypes.MAP}>Map</TabsTrigger>
      </TabsList>

      <TabsContent value={EnumTabTypes.OVERVIEW}>
        <Overview />
      </TabsContent>
      <TabsContent value={EnumTabTypes.MAP}>
        <MapComponent />
      </TabsContent>
    </Tabs>
  );
}
