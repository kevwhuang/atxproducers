export default function (): boolean {
    return localStorage.getItem('password') === import.meta.env.VITE_PASSWORD;
}
