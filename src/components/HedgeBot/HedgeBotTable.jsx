import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Button,
  Select,
  Flex,
  Text,
  Stack,
  Image,
  Box,
} from "@chakra-ui/react";
import { NumericFormat } from "react-number-format";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

function HedgeBotTable({ botsData }) {
  const data = useMemo(() => botsData, []);

  const columns = [
    {
      header: "exchange",
      accessorKey: "tick",
      cell: (row) => {
        return (
          <Stack alignItems={"center"} spacing="2" direction={"row"}>
            <Image
              height="24px"
              width="24px"
              objectFit="contain"
              src={row.row.original.logo}
              alt="Logo"
            />

            <div className="font-semibold">{row.getValue()}</div>
          </Stack>
        );
      },
    },
    {
      header: "Tx Size",
      accessorKey: "tx_size",
      cell: (row) => {
        return (
          <NumericFormat
            className="font-semibold"
            displayType={"text"}
            value={row.getValue()}
            prefix="$"
            thousandSeparator={true}
          />
        );
      },
    },
    {
      header: "Control Size",
      accessorKey: "control_size",
      cell: (row) => {
        return (
          <NumericFormat
            className="font-semibold"
            displayType={"text"}
            value={row.getValue()}
            prefix="$"
            thousandSeparator={true}
          />
        );
      },
    },
    {
      header: "Max Size",
      accessorKey: "max_size",
      cell: (row) => {
        return (
          <NumericFormat
            className="font-semibold"
            displayType={"text"}
            value={row.getValue()}
            prefix="$"
            thousandSeparator={true}
          />
        );
      },
    },
    {
      header: "Min Profit Rate",
      accessorKey: "min_profit",
      cell: (row) => {
        return (
          <NumericFormat
            displayType={"text"}
            value={row.getValue() * 100}
            suffix="%"
            decimalScale={2}
          />
        );
      },
    },
    {
      header: "Holdings",
      accessorKey: "asset_value",
      cell: (row) => {
        return (
          <div className="flex flex-col">
            <NumericFormat
              className="font-semibold"
              displayType={"text"}
              value={row.getValue()}
              prefix="$"
              decimalScale={2}
              thousandSeparator={true}
            />
            <div className="flex space-x-1 text-sm font-semibold">
              <div className="text-gray-300">
                {row.row.original.asset_quantity}
              </div>
              <div className="text-gray-300">{row.row.original.symbol}</div>
            </div>
          </div>
        );
      },
    },
    {
      header: "Avg. Buy Price",
      accessorKey: "average_cost",
      cell: (row) => {
        return (
          <NumericFormat
            className="font-semibold"
            displayType={"text"}
            value={row.getValue()}
            prefix="$"
            decimalScale={2}
            thousandSeparator={true}
          />
        );
      },
    },
    {
      header: "Profit/Loss",
      accessorKey: "asset_profit",
      cell: (row) => {
        return (
          <div className="flex flex-col">
            <NumericFormat
              className="font-semibold"
              displayType={"text"}
              value={row.getValue()}
              prefix="$"
              decimalScale={2}
              thousandSeparator={true}
            />
            <NumericFormat
              displayType={"text"}
              value={row.row.original.asset_profit_percentage * 100}
              suffix="%"
              decimalScale={2}
            />
          </div>
        );
      },
    },
  ];

  const [sorting, setSorting] = useState([
    {
      id: "real_apr",
      desc: true,
    },
  ]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <>
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr bg="#0b0e11" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th
                  color="white"
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}

                  <chakra.span pl="4">
                    {header.column.getIsSorted() ? (
                      header.column.getIsSorted() === "desc" ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}

export default HedgeBotTable;