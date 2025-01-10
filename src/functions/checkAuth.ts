export default function checkAuth(): boolean {
    return localStorage.getItem('password') === import.meta.env.VITE_PASSWORD;
}
