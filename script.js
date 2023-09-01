const accessKey = "HD1UFGJZdFu_0uL0pZVhwdbY_0wIEDoXytXBjPqxzUk";
const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let page = 1;

async function searchImages(inputData) {
    try {
        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;

        if (page === 1) {
            searchResults.innerHTML = "";
        }

        results.forEach((result) => {
            const imageWrapper = document.createElement("div");
            imageWrapper.classList.add("search-result");

            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description;

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description;

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchResults.appendChild(imageWrapper);
        });

        page++;
        if (results.length === 0) {
            showMore.style.display = "none";
        } else {
            showMore.style.display = "block";
        }
    } catch (error) {
        console.error("Error fetching images:", error);
        // Handle the error, e.g., show an error message to the user.
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputData = inputEl.value.trim();
    if (inputData !== "") {
        page = 1;
        searchImages(inputData);
    }
});

showMore.addEventListener("click", () => {
    const inputData = inputEl.value.trim();
    searchImages(inputData);
});
