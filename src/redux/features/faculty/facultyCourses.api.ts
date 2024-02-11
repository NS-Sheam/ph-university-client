import { TQueryParams, TResponseRedux } from "../../../types";
import { TOfferedCourse } from "../../../types/studentCourse.type";
import { baseApi } from "../../api/baseApi";

const facultyCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFacultyCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/enrolled-courses",
          method: "GET",
          params,
        };
      },
      providesTags: ["offeredCourse"],
      transformResponse: (response: TResponseRedux<TOfferedCourse>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addMark: builder.mutation({
      query: (data) => {
        console.log(data);

        return {
          url: "/enrolled-courses/update-enrolled-course-marks",
          method: "PATCH",
          body: data,
        };
      },
    }),
  }),
});

export const { useGetAllFacultyCoursesQuery, useAddMarkMutation } = facultyCourseApi;
