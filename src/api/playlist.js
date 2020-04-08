import { fetchApi } from "../helpers/fetchApi";

const getFormData = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    return formData;
};

export const getPlaylist = (id) => fetchApi(`playlists/${id}`);

export const getUserPlaylists = (id) => fetchApi(`users/${id}/playlists`);

export const deletePlaylist = (id) => fetchApi(`playlists/${id}`, {
    method: "DELETE"
});

export const createPlaylist = (name) => fetchApi(`playlists`, {
    method: "POST",
    body: JSON.stringify({ name })
});

export const createTrack = async (track, playlist_id) => {
    const formData = getFormData(track);
    return fetchApi(`playlists/${playlist_id}/tracks`, {
        method: "POST",
        body: formData,
        headers: {}
    });
};

export const updateTrack = (track) => {
    const formData = getFormData(track);
    return fetchApi(`tracks/${track.id}`, {
        method: "PATCH",
        body: formData,
        headers: {}
    });
};