import { create } from 'zustand';
import { User, saveSession, clearSession, getUser, getToken } from '@/lib/auth';

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    setSession: (token: string, user: User) => void;
    logout: () => void;
    initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    isLoading: true,

    setSession: (token, user) => {
        saveSession(token, user);
        set({ token, user });
    },

    logout: () => {
        clearSession();
        set({ token: null, user: null });
        window.location.href = '/login';
    },

    initialize: () => {
        const token = getToken();
        const user = getUser();
        set({ token, user, isLoading: false });
    },
}));