const apiEndpoints = {
  home: "/",

  // admin
  verifyAdmin: "/admin/verify",
  updatePassword: "/admin/update_password",
  getStats: "/admin/stats",

  // playlists
  createplaylist: "/playlists/new",
  getPlaylistByName: (unique_name: string) => `/playlists/${unique_name}`,
  getAllPlaylists: "/playlists",
  addUserToPlaylist: (unique_name: string, user_id: string) =>
    `/playlists/${unique_name}/add_new_user/${user_id}`,
  removeUserFromPlaylist: (unique_name: string, user_id: string) =>
    `/playlists/${unique_name}/remove_user/${user_id}`,

  // lessons
  createNewLesson: (unique_name: string) =>
    `/playlists/${unique_name}/lessons/new`,
  updateLesson: (unique_name: string, id: string) =>
    `/playlists/${unique_name}/lessons/${id}`,
  deleteLesson: (unique_name: string, id: string) =>
    `/playlists/${unique_name}/lessons/${id}`,

  // vocs
  getAllVocs: (lesson_id: string) => `/playlists/lessons/${lesson_id}/vocs/all`,
  createVoc: (lesson_id: string) => `/playlists/lessons/${lesson_id}/vocs/new`,
  deleteVoc: (lesson_id: string, id: string) =>
    `/playlists/lessons/${lesson_id}/vocs/${id}/remove`,

  // users
  searchUsers: (
    page: number,
    limit: number,
    name: string = "",
    surname: string = "",
    email: string = ""
  ) =>
    `/admin/users/search/?page=${page}&limit=${limit}&name=${name}&surname=${surname}&email=${email}`,
  getUserById: (id: string) => `/admin/users/unique/${id}`,
};

export default apiEndpoints;
