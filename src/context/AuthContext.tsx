import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserSession, ServerItem, ActivityEvent, UserSettings } from '../types';

interface AuthContextType {
  user: UserSession | null;
  loading: boolean;
  servers: ServerItem[];
  activities: ActivityEvent[];
  settings: UserSettings | null;
  botInviteUrl: string;
  currentPath: string;
  navigate: (path: string) => void;
  refreshUser: () => Promise<void>;
  refreshServers: () => Promise<void>;
  refreshActivity: () => Promise<void>;
  demoLogin: (username?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  claimDailyReward: () => Promise<{ success: boolean; message: string; newCoins?: number; newStreak?: number }>;
  toggleServerModule: (serverId: string, moduleKey: string, value: boolean) => Promise<boolean>;
  saveServerSettings: (serverId: string, settings: any) => Promise<boolean>;
  updateSettings: (newSettings: Partial<UserSettings>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [servers, setServers] = useState<ServerItem[]>([]);
  const [activities, setActivities] = useState<ActivityEvent[]>([]);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [botInviteUrl, setBotInviteUrl] = useState<string>('https://discord.com/oauth2/authorize?client_id=133742069000000000&permissions=8&scope=bot%20applications.commands');
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Error fetching auth user:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshServers = useCallback(async () => {
    try {
      const res = await fetch('/api/servers');
      if (res.ok) {
        const data = await res.json();
        setServers(data.servers || []);
      }
    } catch (err) {
      console.error('Error fetching servers:', err);
    }
  }, []);

  const refreshActivity = useCallback(async () => {
    try {
      const res = await fetch('/api/activity');
      if (res.ok) {
        const data = await res.json();
        setActivities(data.activities || []);
      }
    } catch (err) {
      console.error('Error fetching activity:', err);
    }
  }, []);

  const refreshSettings = useCallback(async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings || null);
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  }, []);

  const fetchBotInvite = useCallback(async () => {
    try {
      const res = await fetch('/api/bot-invite-url');
      if (res.ok) {
        const data = await res.json();
        if (data.inviteUrl) {
          setBotInviteUrl(data.inviteUrl);
        }
      }
    } catch (err) {
      console.error('Error fetching bot invite url:', err);
    }
  }, []);

  useEffect(() => {
    refreshUser();
    fetchBotInvite();
  }, [refreshUser, fetchBotInvite]);

  useEffect(() => {
    if (user) {
      refreshServers();
      refreshActivity();
      refreshSettings();
    }
  }, [user, refreshServers, refreshActivity, refreshSettings]);

  const demoLogin = async (username = 'KuroNeko'): Promise<boolean> => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/demo-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        await Promise.all([refreshServers(), refreshActivity(), refreshSettings()]);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Demo login error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
      setUser(null);
      navigate('/');
    }
  };

  const claimDailyReward = async (): Promise<{ success: boolean; message: string; newCoins?: number; newStreak?: number }> => {
    try {
      const res = await fetch('/api/rewards/claim', { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.success) {
        setUser((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            coins: data.newCoins,
            streak: data.newStreak,
            lastClaimDate: new Date().toISOString().split('T')[0],
            history: data.history || prev.history,
          };
        });
        await refreshActivity();
        return { success: true, message: data.message, newCoins: data.newCoins, newStreak: data.newStreak };
      }
      return { success: false, message: data.error || 'Não foi possível resgatar a recompensa.' };
    } catch (err) {
      console.error('Claim reward error:', err);
      return { success: false, message: 'Erro ao conectar ao servidor.' };
    }
  };

  const toggleServerModule = async (serverId: string, moduleKey: string, value: boolean): Promise<boolean> => {
    try {
      const res = await fetch(`/api/servers/${serverId}/toggle-module`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleKey, value }),
      });
      if (res.ok) {
        const data = await res.json();
        setServers((prev) =>
          prev.map((s) => (s.id === serverId ? data.server : s))
        );
        await refreshActivity();
        return true;
      }
      return false;
    } catch (err) {
      console.error('Toggle module error:', err);
      return false;
    }
  };

  const saveServerSettings = async (serverId: string, updatedSettings: any): Promise<boolean> => {
    try {
      const res = await fetch(`/api/servers/${serverId}/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSettings),
      });
      if (res.ok) {
        const data = await res.json();
        setServers((prev) =>
          prev.map((s) => (s.id === serverId ? data.server : s))
        );
        await refreshActivity();
        return true;
      }
      return false;
    } catch (err) {
      console.error('Save settings error:', err);
      return false;
    }
  };

  const updateSettings = async (newSettings: Partial<UserSettings>): Promise<boolean> => {
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings),
      });
      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Update settings error:', err);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        servers,
        activities,
        settings,
        botInviteUrl,
        currentPath,
        navigate,
        refreshUser,
        refreshServers,
        refreshActivity,
        demoLogin,
        logout,
        claimDailyReward,
        toggleServerModule,
        saveServerSettings,
        updateSettings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
