import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ServersPage } from './pages/ServersPage';
import { RewardsPage } from './pages/RewardsPage';
import { ActivityPage } from './pages/ActivityPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProfilePage } from './pages/ProfilePage';
import { StatusPage } from './pages/StatusPage';
import { LegalPage } from './pages/LegalPage';

function RouterView() {
  const { currentPath } = useAuth();

  const path = currentPath.split('?')[0].replace(/\/+$/, '') || '/';

  switch (path) {
    case '/login':
      return <LoginPage />;
    case '/dashboard':
      return <DashboardPage />;
    case '/servers':
      return <ServersPage />;
    case '/rewards':
      return <RewardsPage />;
    case '/activity':
      return <ActivityPage />;
    case '/settings':
      return <SettingsPage />;
    case '/profile':
      return <ProfilePage />;
    case '/status':
      return <StatusPage />;
    case '/legal':
      return <LegalPage />;
    case '/':
    default:
      return <LandingPage />;
  }
}

export default function App() {
  return (
    <AuthProvider>
      <RouterView />
    </AuthProvider>
  );
}
