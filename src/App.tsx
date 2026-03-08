import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import Dashboard from "./pages/Dashboard";
import Computers from "./pages/Computers";
import ComputerForm from "./pages/ComputerForm";
import ImportData from "./pages/ImportData";
import ExportData from "./pages/ExportData";
import UserManagement from "./pages/UserManagement";
import ChangeHistory from "./pages/ChangeHistory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/computers" element={<Computers />} />
            <Route path="/computers/new" element={<ComputerForm />} />
            <Route path="/computers/:id/edit" element={<ComputerForm />} />
            <Route path="/import" element={<ImportData />} />
            <Route path="/export" element={<ExportData />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/history" element={<ChangeHistory />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
