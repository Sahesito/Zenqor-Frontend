import { create } from 'zustand';
import { User, saveSession, clearSession } from '@/lib/auth';

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    setSession: (token: string, user: User) => void;
    logout: () => void;
    initialize: () => void;
    isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    token: null,
    isLoading: true,

    setSession: (token, user) => {
        saveSession(token, user);
        set({ token, user, isLoading: false });
    },

    logout: () => {
        clearSession();
        set({ token: null, user: null, isLoading: false });
        window.location.href = '/login';
    },

    initialize: () => {
        try {
            const token = typeof window !== 'undefined'
                ? localStorage.getItem('zenqor_token')
                : null;
            const raw = typeof window !== 'undefined'
                ? localStorage.getItem('zenqor_user')
                : null;
            const user = raw ? JSON.parse(raw) : null;
            set({ token, user, isLoading: false });
        } catch {
            set({ token: null, user: null, isLoading: false });
        }
    },

    isAdmin: () => get().user?.role === 'ADMIN',
}));