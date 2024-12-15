/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useCreateTaskMutation, useGetTasksQuery } from "@/redux/features/auth/apiauth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Hello from "./Hello";
import InvoiceTable from "./Table";

// Define interfaces for form data and tasks
interface FormData {
  title: string;
  startTime: string;
  endTime: string;
  priority: string;
  status: string;
}

interface TaskQueryParams {
  sortBy: string;
  order: string;
  priority: string;
  status: string;
  userId: string;
}


const TaskControls: React.FC = () => {
  const [open, setOpen] = useState(false);

  // Redux state for the authenticated user
  const { user } = useSelector((state: any) => state.auth);
  const userId = user?._id;

  // Form data state for adding a task
  const [formData, setFormData] = useState<FormData>({
    title: "",
    startTime: "",
    endTime: "",
    priority: "1",
    status: "pending",
  });

  // Query parameter states
  const [sortBy, setSortBy] = useState("startTime");
  const [order, setOrder] = useState("ASC");
  const [priority1, setPriority1] = useState("");
  const [status1, setStatus1] = useState("");

  // Fetch tasks based on filters
  const { data: tasks, isLoading, error } = useGetTasksQuery({
    sortBy,
    order,
    priority: priority1,
    status: status1,
    userId,
  } as TaskQueryParams);

  // Mutation for creating a new task
  const [createTask] = useCreateTaskMutation();

  
  const handleAddTask = async () => {
    const { title, startTime, endTime, priority, status } = formData;

    if (!title || !startTime || !endTime) {
      console.log("Please fill in all required fields.");
      return;
    }
const data :any={
  title,
  startTime,
  endTime,
  priority,
  status,
}
    try {

      await createTask(data).unwrap();
      setOpen(false);
      setFormData({
        title: "",
        startTime: "",
        endTime: "",
        priority: "1",
        status: "pending",
      });
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Task
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                type="datetime-local"
                placeholder="Start Time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                type="datetime-local"
                placeholder="End Time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Priority"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full border p-2 rounded"
              >
                <option value="pending">Pending</option>
                <option value="finished">Completed</option>
              </select>
              <button
                type="button"
                onClick={handleAddTask}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add Task
              </button>
            </form>
          </DialogContent>
        </Dialog>
        <Hello
          sortBy={sortBy}
          setSortBy={setSortBy}
          order={order}
          setOrder={setOrder}
          priority={priority1}
          setPriority={setPriority1}
          status={status1}
          setStatus={setStatus1}
        />
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading tasks.</p>
      ) : (
        <InvoiceTable tasks={tasks} />
      )}
    </div>
  );
};

export default TaskControls;
