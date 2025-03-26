
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import Index from '@/pages/Index';
import Dashboard from '@/pages/Dashboard';
import NotFound from '@/pages/NotFound';
import HypothesisBuilder from '@/pages/HypothesisBuilder';
import HypothesisDetails from '@/pages/HypothesisDetails';

import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hypothesis-builder" element={<HypothesisBuilder />} />
        <Route path="/hypothesis/:id" element={<HypothesisDetails />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
