import "./App.css";
import { Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import PostLoginRedirect from "./pages/PostLoginRedirect";
import Dashboard from "./pages/Dashboard";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post-login-redirect" element={<PostLoginRedirect />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
