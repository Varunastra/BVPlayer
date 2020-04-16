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

export const createTrack = async ({ track, playlistId }) => {
    const formData = getFormData(track);
    return fetchApi(`playlists/${playlistId}/tracks`, {
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

export const searchTrack = ({ searchText }) => {
    return fetchApi(`tracks?search=${searchText}`);
};

export const getTrack = ({ id }) => fetchApi(`tracks/${id}`);

export const addGenre = ({ genre, trackId }) => fetchApi(`tracks/${trackId}/genres`, {
        method: "POST",
        body: JSON.stringify(genre)
    });

export const removeGenre = ({ genre, trackId }) => fetchApi(`tracks/${trackId}/genres`, {
    method: "DELETE",
    body: JSON.stringify(genre)
});

export const updatePlaylist = (playlist) => fetchApi(`playlists/${playlist.id}`, {
    method: "PATCH",
    body: JSON.stringify(playlist)
});

export const addTrack = async ({ trackId, playlistId }) => {
    return fetchApi(`playlists/${playlistId}/tracks`, {
        method: "POST",
        body: JSON.stringify({ id: trackId })
    });
};