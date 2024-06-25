let posts = [];

function addPost() {
  const postContent = document.getElementById('postContent').value;
  if (postContent.trim() !== '') {
    const post = {
      content: postContent,
      likes: 0,
      answers: []
    };
    posts.push(post);
    displayPosts();
    document.getElementById('postContent').value = '';
  }
}

function displayPosts() {
  const postsContainer = document.getElementById('posts');
  postsContainer.innerHTML = '';
  posts.forEach((post, index) => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
      <p class="content">${post.content}</p>
      <p class="actions">
        <span class="like" onclick="likePost(${index})">Like (${post.likes})</span>
        <span class="answer" onclick="answerPost(${index})">Answer</span>
      </p>
      <div class="answers">
        ${post.answers.map(answer => `<p>${answer}</p>`).join('')}
      </div>
    `;
    postsContainer.appendChild(postElement);
  });
}

function likePost(index) {
  posts[index].likes++;
  displayPosts();
}

function answerPost(index) {
  const answer = prompt('Your answer:');
  if (answer && answer.trim() !== '') {
    posts[index].answers.push(answer);
    displayPosts();
  }
}

// Initial display
displayPosts();
