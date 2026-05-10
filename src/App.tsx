/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Staking from './pages/Staking';
import Governance from './pages/Governance';
import Bridge from './pages/Bridge';

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-mine-950 text-gray-300">
      <AnimatePresence mode="wait">
        <div key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<><Navbar /><Dashboard /><Footer /></>} />
            <Route path="/staking" element={<><Navbar /><Staking /><Footer /></>} />
            <Route path="/governance" element={<><Navbar /><Governance /><Footer /></>} />
            <Route path="/bridge" element={<><Navbar /><Bridge /><Footer /></>} />
          </Routes>
        </div>
      </AnimatePresence>
    </div>
  );
}
