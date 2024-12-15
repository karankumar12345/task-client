import React, { useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/redux/features/auth/apiauth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Task {
  _id: string;
  title: string;
  startTime: string;
  endTime: string;
  priority: string;
  status: string;
}

function calculateTimeDifference(startTime: string, endTime: string) {
  const start = new Date(startTime).getTime();  // Convert to timestamp
  const end = new Date(endTime).getTime();    // Convert to timestamp
  const differenceInMs = end - start;

  const hours = Math.floor(differenceInMs / (1000 * 60 * 60));
  const minutes = Math.floor((differenceInMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((differenceInMs % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}

const InvoiceTable = ({ tasks }: { tasks: Task[] }) => {
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Task>({
    _id: "",
    title: "",
    startTime: "",
    endTime: "",
    priority: "1",
    status: "pending",
  });

  const handleOpenDialog = (task: Task) => {
    setFormData(task);
    setOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const { _id, title, startTime, endTime, priority, status } = formData;
      const data = { title, startTime, endTime, priority, status };

      await updateTask({ id: _id, data }).unwrap();
      setOpen(false);
      alert("Task updated successfully!");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id).unwrap();
      alert("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent tasks</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Task ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Total Time to Finish</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tasks.map((task) => {
            const { hours, minutes, seconds } = calculateTimeDifference(task.startTime, task.endTime);
            const timeDifference = `${hours}h ${minutes}m ${seconds}s`;

            return (
              <TableRow key={task._id}>
                <TableCell>{task._id}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.startTime}</TableCell>
                <TableCell>{task.endTime}</TableCell>
                <TableCell>{timeDifference}</TableCell>

                <TableCell>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger>
                      <button onClick={() => handleOpenDialog(task)} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Edit
                      </button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Task</DialogTitle>
                      </DialogHeader>

                      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
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
                        <button
                          type="button"
                          onClick={handleUpdate}
                          className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                          Update Task
                        </button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </TableCell>

                <TableCell>
                  <button onClick={() => handleDelete(task._id)} className="bg-red-500 text-white px-4 py-2 rounded">
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default InvoiceTable;
