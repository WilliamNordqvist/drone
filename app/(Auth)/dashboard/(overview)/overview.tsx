"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { GetColumns } from "./columns";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useDroneContext } from "@/context";
import { Modal } from "./modal";
import { Button } from "@/components/ui/button";
import axios from "axios";

type DroneCardProps = {
  title: string;
  content: string | number;
  css: string;
};

const DroneCard = ({ title, content, css }: DroneCardProps) => (
  <Card className=" relative max-w-[170px] text-center shadow-lg">
    <span
      className={`absolute top-2 right-2 h-2 w-2 ${css} rounded-full `}
    ></span>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium text-center">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{content}</div>
    </CardContent>
  </Card>
);

export const Overview = () => {
  const { deleteDrones, deleteDrone, drones } = useDroneContext();

  const table = useReactTable({
    data: drones,
    columns: GetColumns({ deleteDrone }),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div className="flex space-x-2 mb-5">
        <DroneCard title="Total Drones" content={5} css="bg-black" />
        <DroneCard title="Active Drones" content={2} css=" bg-green-900" />
        <DroneCard title="Inactive Drones" content={3} css=" bg-red-500" />
      </div>

      <div className="flex flex-col justify-between bg-white border border-1 rounded-md  shadow min-h-[500px] max-w-3xl p-3">
        <div>
          <h3 className="text-xl font-bold tracking-tight mb-2">All drones</h3>

          <div className="w-[450px]">
            <Table className="">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header, i) => {
                      return (
                        <TableHead className="¨max-w-[40px]" key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className=" space-x-3">
          <Modal />
          <Button
            variant="destructive"
            disabled={!table.getFilteredSelectedRowModel().rows.length}
            onClick={() => {
              const dronesToDelet = table
                .getFilteredSelectedRowModel()
                .rows.map((drone) => drone.original.id);

              deleteDrones(dronesToDelet);
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
