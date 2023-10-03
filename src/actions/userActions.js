import { instance } from "../utils/api/instance";
export const SignIn = async (userData, navigate, auth) => {
  try {
    const { data } = await instance.post("/auth/login", userData);
    auth.login({
      userId: data.userId,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
    navigate("/editor");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const SignUp = async (userData, navigate) => {
  try {
    const { data } = await instance.post("/auth/register", userData);
    navigate("/");
    return data;
  } catch (error) {
    console.log(error);
  }
};
