const postsContainer = document.querySelector("#posts-container");
const loaderContainer = document.querySelector(".loader");
const filterInput = document.querySelector("#filter");

let page = 1;

const getPosts = async () => {
  const responde = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`
  );
  return responde.json();
};

const generatePostsTemplate = posts => posts
.map(
  ({ id, title, body }) => `<div class="post">
  <div class="number">${id}</div>
  <div class="post-info">
     <h2 class="post-title">${title}</h2>
     <p classe="post-body">${body}</p>
  </div>
</div>`
)
.join("");

const addPostsIntoDOM = async () => {
  const posts = await getPosts();
  const postsTemplate = generatePostsTemplate(posts)

  postsContainer.innerHTML += postsTemplate;
};

const getNextPosts = () => {
  setTimeout(() => {
    page++;
    addPostsIntoDOM();
  }, 300);
};

const removeLoader = () => {
  setTimeout(() => {
    loaderContainer.classList.remove("show");
    getNextPosts();
  }, 1000);
};

const showLoader = () => {
  loaderContainer.classList.add("show");
  removeLoader();
};

const handleScrollToPageBottom = () => {
  const { clientHeight, scrollHeight, scrollTop } = document.documentElement;
  const isPageBottomAlmostReached =
    scrollTop + clientHeight >= scrollHeight - 10;

  if (isPageBottomAlmostReached) {
    showLoader();
  }
};

const shoWPostIfMatchInputValue = inputValue => post => {
  const postTitle = post.querySelector("h2").textContent.toLowerCase();
  const postBody = post.querySelector("p").textContent.toLowerCase();
  const postContainsInputValue =
    postTitle.includes(inputValue) || postBody.includes(inputValue);

  if (postContainsInputValue) {
    post.style.display = "flex";
    return;
  }

  post.style.display = "none";
  console.log(shoWPostIfMatchInputValue)
};

const handleInputValue = event => {
  const inputValue = event.target.value.toLowerCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach(shoWPostIfMatchInputValue(inputValue));
};

addPostsIntoDOM();

window.addEventListener("scroll", handleScrollToPageBottom);
filterInput.addEventListener("input", handleInputValue);
