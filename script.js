const newGrid = document.getElementById("news-grid");
const singleView = document.getElementById("single-article");
const backBtn = document.getElementById("backBtn");

function displayimages() {
  fetch(
    "https://gnews.io/api/v4/top-headlines?country=us&token=fc3c97f3ed730fa45ae0bf79545c768f"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.articles);

      data.articles.forEach((article) => {
        const imgUrl =
          article.image && article.image.startsWith("http")
            ? article.image
            : "https://via.placeholder.com/300x200?text=No+Image"; // fallback image

        const articleDiv = document.createElement("div");

        // build article card
        articleDiv.innerHTML = `
          <img src="${imgUrl}" alt="${article.title || "No title"}" style="width:300px;margin:10px;">
          <h3 class="news-title">${article.title || "No Title"}</h3>
          <p>name: ${article.source?.name || "Unknown"}</p>
          <p>Published: ${
            article.publishedAt
              ? new Date(article.publishedAt).toLocaleString()
              : "N/A"
          }</p>
        `;

        articleDiv.style.border = "1px solid #ccc";
        articleDiv.style.borderRadius = "8px";
        articleDiv.style.padding = "10px";
        articleDiv.style.margin = "10px";
        articleDiv.style.width = "300px";
        articleDiv.style.fontFamily = "Arial, sans-serif";

        // grid styling
        newGrid.style.display = "grid";
        newGrid.style.gridTemplateColumns =
          "repeat(auto-fill, minmax(300px, 1fr))";
        newGrid.style.gap = "10px";

        // click event for single article view
        articleDiv.addEventListener("click", () => {
          document.querySelector(".gridContent").style.display = "none";
          singleView.style.display = "block";

          const imgFull =
            article.image && article.image.startsWith("http")
              ? article.image
              : "https://via.placeholder.com/800x400?text=No+Image";

          document.getElementById("article-content").innerHTML = `
            <img src="${imgFull}" alt="${article.title || "No title"}">
            <h2>${article.title || "No Title"}</h2>
            <p><strong>name:</strong> ${article.source?.name || "Unknown"}</p>
            <p><strong>Published:</strong> ${
              article.publishedAt
                ? new Date(article.publishedAt).toLocaleString()
                : "N/A"
            }</p>
            <p>${article.description || ""}</p>
            <a href="${article.url}" target="_blank">Read full article</a>
          `;
        });

        newGrid.appendChild(articleDiv);
      });
    })
    .catch((error) => {
      console.error("error occurred during fetching: " + error);
    });
}

backBtn.addEventListener("click", () => {
  singleView.style.display = "none";
  document.querySelector(".gridContent").style.display = "block";
});

function toggleMenu() {
  document.getElementById("mobileMenu").classList.toggle("show");
}

displayimages();
