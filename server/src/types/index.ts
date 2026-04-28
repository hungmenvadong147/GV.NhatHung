export interface Course {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MenuItem {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
}

export interface SiteData {
  contact: {
    phone: string;
    email: string;
  };
  menuItems: MenuItem[];
  courses: Course[];
  gallery: GalleryImage[];
}
