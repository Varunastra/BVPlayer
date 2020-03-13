export function settings(state = { volume: 10 }, action) {
    switch (action.type) {
        case "SET_VOLUME":
            return { ...state, volume: action.payload };
        default:
            return state;
    }
}

// parsed.forEach((v, i) => {
//     const video = v.querySelector("#video-title");
//     if (video) {
//         if (video.innerHTML.toUpperCase().includes("DSIDE")) {
//             console.log(video);
//             setTimeout(() => {
//                 v.querySelector("#button[aria-label='Меню действий'").click();
//             }, 200 * (i + 1));
//             setTimeout(() => {
//                 const list = [...document.querySelectorAll("yt-formatted-string.ytd-menu-service-item-renderer")];
//                 list[3].click();
//             }, 300 * (i + 1));
//         }
//     }
// });   