export interface User {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'USER';
    company?: string;
}

export function getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('zenqor_token');
}

export function getUser(): User | null {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem('zenqor_user');
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
}

export function saveSession(token: string, user: User) {
    localStorage.setItem('zenqor_token', token);
    localStorage.setItem('zenqor_user', JSON.stringify(user));
}

export function clearSession() {
    localStorage.removeItem('zenqor_token');
    localStorage.removeItem('zenqor_user');
}

export function isAuthenticated(): boolean {
    return !!getToken();
}