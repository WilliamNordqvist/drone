import { ColumnDef } from "@tanstack/react-table";
import { Drone } from "../../../types";
import Link from "next/link";
import { DeleteIcon, EditIcon } from "@/icons";
import { Checkbox } from "@/components/ui/checkbox";

export const GetColumns = ({
  deleteDrone,
}: {
  deleteDrone: (id: number) => void;
}): ColumnDef<Drone>[] => {
  const columns: ColumnDef<Drone>[] = [
    {
      accessorKey: "checkbox",

      header: (props) => (
        <Checkbox
          checked={props.table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) =>
            props.table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="välj alla"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="välj alla"
        />
      ),
    },

    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "status",
      header: () => <p className="text-center">Status</p>,
      cell: () => (
        <div className="flex justify-center">
          <svg
            className="h-7 w-7 text-green-900"
            viewBox="0 0 10 4"
            fill="currentColor"
          >
            <circle cx="2" cy="2" r="2" />
          </svg>
        </div>
      ),
    },

    {
      accessorKey: "Edit",
      header: () => <p className="text-right">Edit</p>,
      cell: ({ row }) => {
        return (
          <Link
            href={`drone/${row.original.id}`}
            className="w-full flex justify-end cursor-pointer"
          >
            <EditIcon />
          </Link>
        );
      },
    },
    {
      accessorKey: "Delete",
      header: () => <p className="text-right">Delete</p>,
      cell: ({ row }) => {
        return (
          <div
            className="w-full flex justify-end cursor-pointer"
            onClick={() => deleteDrone(row.original.id)}
          >
            <DeleteIcon />
          </div>
        );
      },
    },
  ];

  return columns;
};
