import { apiSlice } from "./api";

interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput extends LoginInput {
  name: string;
}

interface UpdateProfileInput {
  name?: string;
  email?: string;
  password?: string;
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: LoginInput) => ({
        url: "login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "DELETE",
        credentials: "include",
      }),
    }),
    register: builder.mutation({
      query: (data: RegisterInput) => ({
        url: "register",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data: UpdateProfileInput) => ({
        url: "profile",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateProfileMutation,
} = userApiSlice;
