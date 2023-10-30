import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query";

interface IGetVacationsResponse {
  vacations: object[];
  page: number;
  pages: number;
  count: number;
}

export const vacationsApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
      baseUrl: `/api/vacations/`,
      prepareHeaders: (headers, { getState }) => {
        const token = localStorage.getItem('token');
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
      },
    }),
    endpoints: (builder) => ({
     
    })
  });
