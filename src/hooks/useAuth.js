import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useLocalStorage("userId", null);
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", null);
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", null);
  const navigate = useNavigate();

  const login = async (data) => {
    setUserId(data.userId);
    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);
    navigate("/my-news");
  };

  const logout = () => {
    setUserId();
    setAccessToken()
    setRefreshToken()
    navigate("/", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
