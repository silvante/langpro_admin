export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  profile_pic: string;
  google_id: string;
  role: "USER" | "ADMIN"; // extendable if you add more roles
  is_verified: boolean;
  created_at: Date;
  courses: Courses[];
}

export interface Courses {
  id: string;
  playlist: Playlist;
}

export interface Playlist {
  id: string;
  unique_name: string;
  title: string;
  description: string;
  thumbnail: string;
  created_at: Date;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  video_url: string;
  title: string;
  description: string;
  order: number;
  playlistId: string;
  vocabulary: Vocs[];
  created_at: Date;
}

export interface Vocs {
  id: string;
  word: string;
  translation: string;
  lessonId: string;
}

export interface Stats {
  total_lessons: number;
  total_playlists: number;
  total_users: number;
  total_vocabulary: number;
  data: {
    id: string;
    title: string;
    _count: { users: number };
  }[];
}