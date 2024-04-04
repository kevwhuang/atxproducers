function capitalizeResource(str: string): string {
    switch (str) {
        case 'one shot': return 'One Shot';
        case 'midi': return 'MIDI';
        default: return str[0]!.toUpperCase() + str.slice(1);
    }
}

function checkAuth(): boolean {
    return localStorage.getItem('password') === import.meta.env['VITE_PASSWORD'];
}

function parseDatetime(date: Date, duration: number): string {
    function parseTime(hour: number, minute: number): string {
        const post = hour <= 11 ? 'AM' : 'PM';
        if (hour >= 13) hour -= 12;
        return `${hour}:${minute.toString().padStart(2, '0')} ${post}`;
    }

    const month = date.toLocaleString('en-us', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    const start = parseTime(date.getHours(), date.getMinutes());
    const end = parseTime(date.getHours() + (duration / 60), date.getMinutes());
    return `${month} ${day}, ${year}\u00A0 • \u00A0${start} \u2015 ${end}`;
}

export {
    capitalizeResource,
    checkAuth,
    parseDatetime,
};
