import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FieldType } from '../../pages/login.page';

import { IUser } from './types';
import { setUser } from '../features/userSlice';

const BASE_URL = process.env.NX_REACT_APP_SERVER_ENDPOINT as string;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/auth/`,
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
    loginUser: builder.mutation<
      { accessToken: string; status: string; username: string },
      FieldType
    >({
      query(data) {
        return {
          url: 'login',
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
      transformResponse: async (response: {
        accessToken: string;
        status: string;
        username: string;
      }) => {
        localStorage.setItem('token', response.accessToken);
        return response;
      },

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(authApi.endpoints.getMe.initiate());
        } catch (error) {}
      },
    }),

    logoutUser: builder.mutation<void, void>({
      query() {
        return {
          url: 'logout',
          credentials: 'include',
        };
      },
    }),

    getMe: builder.query<IUser, void>({
      query() {
        return {
          url: 'profile',
          credentials: 'include',
        };
      },
      // transformResponse: (result: { data: IUser }) => result.data,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const user = await queryFulfilled;
          dispatch(setUser(user.data));
        } catch (error) {}
      },
    }),
  }),
});

export const { useLoginUserMutation, useLogoutUserMutation } = authApi;
