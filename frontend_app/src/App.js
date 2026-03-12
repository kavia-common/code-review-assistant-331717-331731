import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { AppLayout } from "./components/AppLayout";
import { NewReviewPage } from "./pages/NewReviewPage";
import { HistoryPage } from "./pages/HistoryPage";
import { ReviewDetailPage } from "./pages/ReviewDetailPage";

function Home() {
  return (
    <AppLayout>
      <NewReviewPage />
    </AppLayout>
  );
}

function History() {
  return (
    <AppLayout>
      <HistoryPage />
    </AppLayout>
  );
}

function ReviewDetail() {
  return (
    <AppLayout>
      <ReviewDetailPage />
    </AppLayout>
  );
}

// PUBLIC_INTERFACE
function App() {
  /** App entry: sets up routes (no authentication pages). */
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/review/:id" element={<ReviewDetail />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
