export type CreateLessonData = {
  title: string;
  description: string;
  video_url: string;
};

export type updateLessonData = {
  title: string;
  description: string;
  video_url?: string;
};
