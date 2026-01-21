export type ContactInfo = {
    email: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
};

export type Profile = {
    name: string;
    title: string;
    bio: string;
    education?: string;
    passion?: string[];
    philosophy?: string;
    contacts: ContactInfo;
    /** Optional array of image URLs used in hero/profile carousel */
    images?: string[];
};

export type Skills = Record<string, string[]>;

export type PortfolioItem = {
    title: string;
    description: string;
    tech: string[];
    link: string;
    category?: string;
    image?: string;
};

export type ExpertiseGroup = {
    category: string;
    items: string[];
};
