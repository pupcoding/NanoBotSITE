export interface UserSession {
  id: string;
  discordId: string;
  username: string;
  discriminator: string;
  avatar: string;
  email?: string;
  joinedAt: string;
  coins: number;
  streak: number;
  lastClaimDate: string | null;
  history: {
    dayNum: number;
    dayLabel: string;
    claimed: boolean;
    dateStr: string;
  }[];
}

export interface ServerItem {
  id: string;
  name: string;
  icon: string | null;
  members: number;
  isInstalled: boolean;
  status: 'online' | 'offline' | 'pending';
  rolesCount: number;
  channelsCount: number;
  ownerId: string;
  modules: {
    moderation: boolean;
    economy: boolean;
    welcome: boolean;
    logs: boolean;
    automod: boolean;
    antinuke: boolean;
  };
  settings?: {
    prefix: string;
    logChannel: string;
    welcomeChannel: string;
    automodStrictness: 'low' | 'medium' | 'high';
  };
}

export interface ActivityEvent {
  id: string;
  type: 'reward' | 'moderation' | 'server' | 'system' | 'settings';
  title: string;
  description: string;
  timeAgo: string;
  timestamp: string;
  iconType: 'gift' | 'shield' | 'server' | 'sliders';
}

export interface UserSettings {
  language: 'pt-BR' | 'en-US';
  theme: 'dark-electric' | 'deep-navy';
  emailNotifications: boolean;
  discordDmNotifications: boolean;
  weeklyDigest: boolean;
  twoFactorRequirement: boolean;
  webhookUrl: string;
}

export interface StatusComponent {
  name: string;
  status: 'operacional' | 'degradado' | 'manutencao';
  uptime: string;
  description: string;
}

export interface StatusData {
  overall: string;
  uptimePercentage: number;
  responseTimeMs: number;
  components: StatusComponent[];
  lastIncident: string | null;
  incidentsHistory: {
    id: string;
    title: string;
    date: string;
    duration: string;
    status: string;
  }[];
}
