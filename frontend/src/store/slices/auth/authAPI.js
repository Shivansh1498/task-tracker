import axiosApi from "../../../utils/axiosApi";

// API TO REGISTER USER
// export const registerUser = async (userInfo, { rejectWithValue }) => {
//   try {
//     const response = await axiosApi.post(
//       "/user/register",
//       {
//         name: userInfo.name,
//         email: userInfo.email,
//         password: userInfo.password,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }
// };
