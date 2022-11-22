import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {DefaultProject} from "../models/project.model";

export const ProjectAPI = createApi({
  reducerPath: "projectAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://82.202.204.94/tmp/test.php",
  }),
  endpoints: (build) => ({
    getProject: build.query<DefaultProject, any>({
      query: () => ({
        url: ""
      }),
    }),
  })
})
