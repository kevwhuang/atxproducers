export default function (str: string): string {
    switch (str) {
        case 'one shot': return 'One Shot';
        case 'midi': return 'MIDI';
        default: return str[0]!.toUpperCase() + str.slice(1);
    }
}
