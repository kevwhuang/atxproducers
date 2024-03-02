export interface Producer {
  admin: boolean;
  featured: boolean;
  speaker: boolean;
  alias: string;
  description: string;
  name: string;
  photo: string;
  genres: string[];
  instruments: string[];
  links: {
    bandcamp?: string;
    instagram?: string;
    soundcloud?: string;
    spotify?: string;
    tiktok?: string;
    website?: string;
  };
  workstations: string[];
}
