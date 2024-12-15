/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetTasksQuery } from "@/redux/features/auth/apiauth";

interface HelloProps {
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  order: string;
  setOrder: React.Dispatch<React.SetStateAction<string>>;
  priority: string;
  setPriority: React.Dispatch<React.SetStateAction<string>>;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

const Hello: React.FC<HelloProps> = ({
  sortBy,
  setSortBy,
  order,
  setOrder,
  priority,
  setPriority,
  status,
  setStatus,
}) => {

  // Function to reset all filters to their default values
  const handleResetFilters = () => {
    setSortBy("startTime");
    setOrder("ASC");
    setPriority("");
    setStatus("");
  };

  const handleSortChange = (sortOption: string) => setSortBy(sortOption);
  const handleOrderChange = (orderOption: string) => setOrder(orderOption);
  const handlePriorityChange = (priorityOption: string) => setPriority(priorityOption);
  const handleStatusChange = (statusOption: string) => setStatus(statusOption);

  return (
    <div>
      <div className="flex flex-wrap md:flex-row md:space-x-6 space-y-4 md:space-y-0 mb-6">
        {/* Sorting Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger>Sort</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Sort</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {["Start Time ASC", "Start Time DESC", "End Time ASC", "End Time DESC"].map((sortOption, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => handleSortChange(sortOption.split(" ")[0])}
              >
                {sortOption}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem onClick={handleResetFilters} className="text-red-500 mt-2">
              Reset
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Priority Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger>Priority</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            {["1", "2", "3", "4"].map((priorityOption) => (
              <DropdownMenuItem
                key={priorityOption}
                onClick={() => handlePriorityChange(priorityOption)}
              >
                {priorityOption}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem onClick={handleResetFilters} className="text-red-500 mt-2">
              Reset
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Status Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger>Status</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            {["Pending", "Finished", "Team"].map((statusOption) => (
              <DropdownMenuItem
                key={statusOption}
                onClick={() => handleStatusChange(statusOption)}
              >
                {statusOption}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem onClick={handleResetFilters} className="text-red-500 mt-2">
              Reset
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Task Display Section */}
     
    </div>
  );
};

export default Hello;
