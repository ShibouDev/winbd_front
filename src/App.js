import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/routing/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";
import {
  EditorEditPage,
  EditorPage,
  MyNewsPage,
  SignInPage,
  SignUpPage,
} from "./pages";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route
          path="/editor"
          element={
            <ProtectedRoute>
              <EditorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-news"
          element={
            <ProtectedRoute>
              <MyNewsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editor-edit"
          element={
            <ProtectedRoute>
              <EditorEditPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
