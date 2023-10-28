import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUser } from '../features/userSlice';
import { IGenericResponse, IUser } from './types';

const BASE_URL = process.env.NX_REACT_APP_SERVER_ENDPOINT as string;

export interface ICreateUser {
  username: string;
  firstName: string;
  lastName: string;
  status: string;
  role: string;
  email: string;
}

interface IGetUsersQuery {
  page?: number;
  pageSize?: number;
  sortField?: string;
  sortOrder?: string;
}
interface IGetUserQuery {
  username: string;
}
interface IUpdateUserQuery {
  data: { [key: string]: string } | object;
  username: string;
}

interface IGetUsersResponse {
  users: IUser[];
  page: number;
  pages: number;
  count: number;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/users/`,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation<IGenericResponse, ICreateUser>({
      query(data) {
        return {
          url: 'create',
          method: 'POST',
          body: data,
        };
      },
      // transformErrorResponse(error) {
      //   return error.data;
      // },
    }),
    getUsers: builder.mutation<IUser[] | IGetUsersResponse, IGetUsersQuery>({
      query(data) {
        return {
          url: 'all',
          method: 'GET',
          params: data,
        };
      },
    }),
    getUser: builder.mutation<IUser, IGetUserQuery>({
      query(data) {
        return {
          url: 'find',
          method: 'GET',
          params: data,
        };
      },
    }),
    updateUser: builder.mutation<IUser, IUpdateUserQuery>({
      query(data) {
        return {
          url: 'update',
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUsersMutation,
  useGetUserMutation,
  useUpdateUserMutation,
} = userApi;
