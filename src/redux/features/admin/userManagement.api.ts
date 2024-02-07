import { TFaculty, TQueryParams, TResponseRedux, TStudent } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/students",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
    updateStudent: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/students/${id}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    getSingleStudent: builder.query({
      query: (id) => {
        return {
          url: `/students/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TStudent>) => {
        return {
          data: response.data,
        };
      },
    }),
    getAllFaculties: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/faculties",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addFaculty: builder.mutation({
      query: (data) => ({
        url: "/users/create-faculty",
        method: "POST",
        body: data,
      }),
    }),
    updateFaculty: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/faculties/${id}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    getSingleFaculty: builder.query({
      query: (id) => {
        return {
          url: `/faculties/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TStudent>) => {
        return {
          data: response.data,
        };
      },
    }),
  }),
});

export const {
  useAddStudentMutation,
  useGetAllStudentsQuery,
  useUpdateStudentMutation,
  useGetSingleStudentQuery,
  useAddFacultyMutation,
  useGetAllFacultiesQuery,
  useUpdateFacultyMutation,
  useGetSingleFacultyQuery,
} = userManagementApi;
