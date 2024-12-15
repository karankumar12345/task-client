import { apiSlice } from "../apislice";
import { userLogin, userRegistration } from "./authslice";

// Define the types for the responses
type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = {
  name: string;
  email: string;
  password: string;
};



type LoginData = {
  email: string;
  password: string;
};
type TaskData = {
  title: string;
  startTime: string;
  endTime: string;
  priority: string;
  status: string;
};


// Define the response type for the login endpoint
type LoginResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    // Add any other fields you expect in the user object
  };
};


export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: 'user/register',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              token: result.data.activationToken,
            })
          );
        } catch (error) {
          console.error("Registration error:", error);
        }
      },
    }),
    CreateTask: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: 'task',
        method: 'POST',
        body: data,
      }),
      }),
      UpdateTask: builder.mutation<{ message: string }, { id: string; data: TaskData }>({
        query: ({ id, data }) => ({
          url: `task/update/${id}`,
          method: 'PUT',
          body: data,
        }),
      }),
      DeleteTask: builder.mutation<{ message: string }, string>({
        query: (id) => ({
          url: `task/delete/${id}`,
          method: 'DELETE',
        }),
      }),

  

    loginUser: builder.mutation<LoginResponse, LoginData>({
      query: ({ email, password }) => ({
        url: 'user/login',
        method: 'POST',
        body: { email, password },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLogin({
              token: result.data.token,
              user: result.data.user,
            })
          );
        } catch (error) {
          console.error("Login error:", error);
        }
      },
    }),

  


    DashBoardData: builder.query({
      query: () => ({
        url: 'task/getDashboard',
        method: 'GET',
        credentials: "include" as const,
      }),
    }),


    LogoutUser: builder.mutation({
      query: () => ({
        url: 'user/logout',
        method: 'GET',
        credentials: "include" as const,
      }),
    }),
    getTasks: builder.query({
      query: ({ sortBy, order, priority, status, userId }) => {
        const query = `/task/gettask`;
    
        const queryParams = new URLSearchParams();
        queryParams.append('sortBy', sortBy);
        queryParams.append('order', order);
    
        if (priority) {
          queryParams.append('priority', priority);
        }
    
        if (status) {
          queryParams.append('status', status);
        }
    
        if (userId) {
          queryParams.append('userId', userId);
        }
    
        return `${query}?${queryParams.toString()}`;
      },
    }),
    }),

    
});

export const {useDashBoardDataQuery,useDeleteTaskMutation,useUpdateTaskMutation,useGetTasksQuery, useCreateTaskMutation,useLogoutUserMutation,useRegisterUserMutation, useLoginUserMutation } = authApi;
