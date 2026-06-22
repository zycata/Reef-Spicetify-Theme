const DEFAULT_THEME = "Crustaceans";
const GITHUB_URL = "https://github.com/zycata/Reef-Spicetify-Theme/blob/main/assets";

function getTheme() {
    // If no color_scheme is set it should return "" which evaluates to false in JS
    return Spicetify?.Config?.color_scheme || DEFAULT_THEME;
}

function waitForElement(els, func, timeout = 100) {
    const queries = els.map((el) => document.querySelector(el));
    if (queries.every((a) => a)) {
        func(queries);
    } else if (timeout > 0) {
        setTimeout(waitForElement, 300, els, func, --timeout);
    }
}

function refreshTheme(theme) {
    
    waitForElement([".Root__top-container"], ([el]) => {
        el.style.backgroundImage = `url(${encodeURI(`${GITHUB_URL}/${theme}/background.png?raw=true`)})`;
    })
    refreshLikedSongsImage(theme);
    setProgressSlider(theme);
}

function refreshLikedSongsImage(theme) {
    const likedSongsImageSelectors = [
        'img[src="https://misc.scdn.co/liked-songs/liked-songs-300.png"]', 
        'img[src="https://misc.scdn.co/liked-songs/liked-songs-300.jpg"]', 
        'img[src="https://misc.scdn.co/liked-songs/liked-songs-640.jpg"]'
    ];

    for (const selector of likedSongsImageSelectors) {
        for (const img of document.querySelectorAll(selector)) {
            img.setAttribute("src", `${GITHUB_URL}/${theme}/liked_songs.png?raw=true`);
            img.removeAttribute("srcset");
        }
    }


    const observer = new MutationObserver((mutations, obs) => {
        for (const selector of likedSongsImageSelectors) {
            const elements = document.querySelectorAll(selector);
            if (elements.length > 0) {
                for (const img of elements) {
                    img.setAttribute("src", `${GITHUB_URL}/${theme}/liked_songs.png?raw=true`);
                    img.removeAttribute("srcset");
                }
                // obs.disconnect(); 
            }
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

function setProgressSlider(theme) {
    if (document.getElementById("custom-progress-slider-style")) return;

    // const gifUrl = `${GITHUB_URL}/${theme}/progressSlider.gif?raw=true`;
    const gifUrl = "https://cdn.dribbble.com/userupload/20605456/file/original-113373bcb4a3cd3eb42f45fa78d89b76.gif"
    
    const style = document.createElement("style");
    style.id = "custom-progress-slider-style";
    
    style.innerHTML = `
        .progress-bar__slider, 
        [data-testid="progress-bar-handle"], 
        .x-progressBar-handle {
            background-image: url(${gifUrl}) !important;
            background-repeat: no-repeat !important;
        }
    `;

    // This was way better
    document.head.appendChild(style);
}
const current_theme = getTheme();
refreshTheme(current_theme)