import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { AppLayout } from "./components/AppLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { NewReviewPage } from "./pages/NewReviewPage";
import { HistoryPage } from "./pages/HistoryPage";
import { ReviewDetailPage } from "./pages/ReviewDetailPage";

function AuthedHome() {
  return (
    <ProtectedRoute>
      <AppLayout>
        <NewReviewPage />
      </AppLayout>
    </ProtectedRoute>
  );
}

function AuthedHistory() {
  return (
    <ProtectedRoute>
      <AppLayout>
        <HistoryPage />
      </AppLayout>
    </ProtectedRoute>
  );
}

function AuthedReviewDetail() {
  return (
    <ProtectedRoute>
      <AppLayout>
        <ReviewDetailPage />
      </AppLayout>
    </ProtectedRoute>
  );
}

function AuthGateLogin() {
  const { isAuthed } = useAuth();
  if (isAuthed) return <Navigate to="/" replace />;
  return <LoginPage />;
}

function AuthGateSignup() {
  const { isAuthed } = useAuth();
  if (isAuthed) return <Navigate to="/" replace />;
  return <SignupPage />;
}

// PUBLIC_INTERFACE
function App() {
  /** App entry: sets up routes + authentication provider. */
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthedHome />} />
          <Route path="/history" element={<AuthedHistory />} />
          <Route path="/review/:id" element={<AuthedReviewDetail />} />

          <Route path="/login" element={<AuthGateLogin />} />
          <Route path="/signup" element={<AuthGateSignup />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
