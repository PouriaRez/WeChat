import API from "../api/axios";

interface AuthResponseToken {
  token: string;
}

export const login = async (username: string, password: string) => {
  try {
    const response = await API.post<AuthResponseToken>("/auth/login", {
      username,
      password,
    });

    const { token } = response.data;
    console.log("Response data:", response.data); // Log the entire response

    localStorage.setItem("authToken", token);
    localStorage.setItem("user", username);
  } catch (error) {
    console.error("Error: ", error);
    throw new Error("Login failed");
  }
};

export const register = async (username: string, password: string) => {
  try {
    const response = await API.post("/auth/register", { username, password });
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw new Error("Registration failed");
  }
};

export const signout = () => {
  localStorage.removeItem("authToken");
};
