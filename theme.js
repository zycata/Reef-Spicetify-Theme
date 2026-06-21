const DEFAULT_THEME = "Crustaceans"
const GITHUB_URL = "https://github.com/zycata/Reef-Spicetify-Theme/blob/main/assets"

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
    refreshLikedSongsImage(theme)

    waitForElement([".Root__top-container"], ([el]) => {
        el.style.backgroundImage = `url(${encodeURI(`${GITHUB_URL}/${theme}/background.png?raw=true`)})`;
    })
}

function refreshLikedSongsImage(theme) {
    for (const selector of likedSongsImageSelectors) {
        for (const img of document.querySelectorAll(selector)) {
            img.setAttribute("src", `${GITHUB_URL}/${theme}/liked_songs.png?raw=true`)
            img.removeAttribute("srcset")
        }
    }
}







refreshTheme(getTheme())