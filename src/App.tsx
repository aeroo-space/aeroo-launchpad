import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Competitions from "./pages/Competitions";
import Courses from "./pages/Courses";
import Products from "./pages/Products";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Careers from "./pages/Careers";
import Community from "./pages/Community";
import Support from "./pages/Support";
import FAQ from "./pages/FAQ";
import Contacts from "./pages/Contacts";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import CompetitionSatelliteLaunch2026 from "./pages/CompetitionSatelliteLaunch2026";
import CompetitionSpaceSettlement2025 from "./pages/CompetitionSpaceSettlement2025";
import ExploringWorldOfScience from "./pages/ExploringWorldOfScience";
import RocketScience2026 from "./pages/RocketScience2026";
import SpaceAI2026 from "./pages/SpaceAI2026";
import EnrollPage from "./pages/Enroll";
import ProductRequestsPage from "./pages/ProductRequests";
import RocketScienceKit from "./pages/RocketScienceKit";
import { AuthProvider } from "@/contexts/AuthProvider";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { ThemeProvider } from "@/components/theme-provider";
import ProtectedRoute from "@/components/common/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/competitions" element={<Competitions />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/community" element={<Community />} />
              <Route path="/support" element={<Support />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contacts" element={<Contacts />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/competitions/satellite-launch-2026" element={<CompetitionSatelliteLaunch2026 />} />
              <Route path="/competitions/space-settlement-2025" element={<CompetitionSpaceSettlement2025 />} />
              <Route path="/competitions/exploring-world-of-science" element={<ExploringWorldOfScience />} />
              <Route path="/competitions/rocket-science-2026" element={<RocketScience2026 />} />
              <Route path="/competitions/space-ai-2026" element={<SpaceAI2026 />} />
              <Route path="/enroll/:competitionId" element={
                <ProtectedRoute>
                  <EnrollPage />
                </ProtectedRoute>
              } />
              <Route path="/product-requests" element={
                <ProtectedRoute>
                  <ProductRequestsPage />
                </ProtectedRoute>
              } />
              <Route path="/products/rocket-science-kit" element={<RocketScienceKit />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
