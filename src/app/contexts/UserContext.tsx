/**
 * User Context
 * Provides centralized user data for the entire application
 * Currently uses mock data; can be replaced with real API integration
 */

import { createContext, useContext, type ReactNode } from "react";

// ============================================
// Types
// ============================================

export interface User {
  id: number;
  name: string;
  nim: string;
  email: string;
  avatar: string;
  program: string;
  campus: string;
  satPoints: {
    current: number;
    max: number;
  };
  communityService: {
    current: number;
    max: number;
  };
}

// ============================================
// Mock Data
// ============================================

const MOCK_USER: User = {
  id: 1,
  name: "Mahasiswa",
  nim: "290xxxx413",
  email: "maha.siswa@binus.ac.id",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  program: "Computer Science",
  campus: "BINUS @Medan",
  satPoints: {
    current: 85,
    max: 120,
  },
  communityService: {
    current: 15,
    max: 30,
  },
};

// ============================================
// Context
// ============================================

const UserContext = createContext<User | null>(null);

// ============================================
// Provider
// ============================================

interface UserProviderProps {
  children: ReactNode;
  /** Optional user data override (for testing or API integration) */
  user?: User;
}

export function UserProvider({ children, user = MOCK_USER }: UserProviderProps) {
  // Future: replace with actual auth/API call
  // const [user, setUser] = useState<User | null>(null);
  // useEffect(() => { fetchUser(); }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

// ============================================
// Hook
// ============================================

/**
 * Hook to access user data
 * @throws Error if used outside of UserProvider
 */
export function useUser(): User {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}

/**
 * Computed helpers for user data
 */
export function useUserProgress() {
  const user = useUser();

  const satPercentage = Math.round((user.satPoints.current / user.satPoints.max) * 100);
  const comservPercentage = Math.round((user.communityService.current / user.communityService.max) * 100);

  return {
    sat: {
      current: user.satPoints.current,
      max: user.satPoints.max,
      percentage: satPercentage,
      remaining: user.satPoints.max - user.satPoints.current,
    },
    comserv: {
      current: user.communityService.current,
      max: user.communityService.max,
      percentage: comservPercentage,
      remaining: user.communityService.max - user.communityService.current,
    },
  };
}