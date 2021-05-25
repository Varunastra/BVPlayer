import { fetchApi } from "../helpers/fetchApi";

const getFormData = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return formData;
};

// const uploadFile = async (file, kind) => {;
//     const { url, signedRequest } = await fetchApi(
//         `${kind}/upload?type=${file.type}`
//     );
//     await fetch(signedRequest, {
//         method: "PUT",
//         body: file,
//         headers: {
//             "Content-Type": file.type,
//             'x-amz-acl': 'public-read'
//         }
//     });
//     return url;
// };

export const getPlaylist = (id) => fetchApi(`playlists/${id}`);

export const getUserPlaylists = (id) => fetchApi(`users/${id}/playlists`);

export const createPlaylist = (playlist) => {
  return fetchApi(`playlists`, {
    method: "POST",
    body: JSON.stringify(playlist),
  });
};

export const removePlaylist = (id) => {
  return fetchApi(`playlists/${id}`, {
    method: "DELETE",
  });
};

export const duplicatePlaylist = ({ id, newName }) => {
  return fetchApi(`playlists/${id}?method=duplicate`, {
    method: "POST",
    body: JSON.stringify({ newName }),
  });
};

export const createTrack = async ({ cacheTrackIndex, playlistId }) => {
  return fetchApi(`playlists/${playlistId}/track-save`, {
    method: "POST",
    body: JSON.stringify({ cacheTrackIndex }),
  });
};

export const updateTrack = async (track) => {
  const formData = getFormData(track);
  return fetchApi(`tracks/${track.id}`, {
    method: "PATCH",
    body: formData,
    headers: {},
  });
};

export const searchTrack = ({ searchText }) => {
  return fetchApi(`tracks?search=${searchText}`);
};

export const removeTrack = ({ playlistId, trackId }) => {
  return fetchApi(`playlists/${playlistId}/tracks/${trackId}`, {
    method: "DELETE",
  });
};

export const getTrack = ({ id }) => fetchApi(`tracks/${id}`);

export const addGenre = ({ genre, trackId }) =>
  fetchApi(`tracks/${trackId}/genres`, {
    method: "POST",
    body: JSON.stringify(genre),
  });

export const removeGenre = ({ genre, trackId }) =>
  fetchApi(`tracks/${trackId}/genres`, {
    method: "DELETE",
    body: JSON.stringify(genre),
  });

export const updatePlaylist = (playlist) =>
  fetchApi(`playlists/${playlist.id}`, {
    method: "PATCH",
    body: JSON.stringify(playlist),
  });

export const addTrack = async ({ trackId, playlistId }) => {
  return fetchApi(`playlists/${playlistId}/tracks`, {
    method: "POST",
    body: JSON.stringify({ id: trackId }),
  });
};

export const uploadTrack = async (track) => {
  return fetchApi(`track-upload`, {
    method: "POST",
    body: getFormData({ track }),
    headers: {},
  });
};

export const rateTrack = async ({ trackId, rating }) => {
  return fetchApi(`tracks/${trackId}/rate`, {
    method: "POST",
    body: JSON.stringify({ rating }),
  });
};

export const getRecommendations = async (query) => {
  const params = new URLSearchParams(query);
  return fetchApi(`playlists/recommendations?${params.toString()}`, {
    method: "GET",
  });
};
