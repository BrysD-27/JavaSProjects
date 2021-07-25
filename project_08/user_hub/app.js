const BASE_URL = 'https://jsonplace-univclone.herokuapp.com';

function bootstrap() {
    fetchUsers().then(renderUserList);
}

bootstrap();

/** Data fetch Functions */

function fetchUsers() {
    return fetchData(`${ BASE_URL }/users`);
}

function fetchUserAlbumList(userId) {
    return fetchData(`${ BASE_URL }/users/${ userId }/albums?_expand=user&_embed=photos`);
}

function fetchUserPosts(userId) {
    return fetchData(`${ BASE_URL }/users/${ userId }/posts?_expand=user`);
}

function fetchPostComments(postId) {
    return fetchData(`${ BASE_URL }/posts/${ postId }/comments`);
}

fetchUserPosts(1).then(console.log); // why does this work?  Wait, what?  
fetchUserAlbumList(1).then(console.log);
fetchPostComments(1).then(console.log);
let fakePost = { id: 1 }

setCommentsOnPost(fakePost)
  .then(console.log)
  .catch(console.error)

function fetchData(url) {
    return fetch(url)
        .then(function(response) {
            return response.json();
        }).catch(function(error) {
            console.log('Error');
        });
}

/** User Data Functions */

function renderUser(user) {
    const userElement = $(`
    <div class="user-card">
    <header>
      <h2>${user.name}</h2>
    </header>
    <section class="company-info">
      <p><b>Contact:</b>${user.email}</p>
      <p><b>Works for:</b>${user.company.name}</p>
      <p><b>Company creed:</b>${user.company.catchPhrase}</p>
    </section>
    <footer>
      <button class="load-posts">POSTS BY ${user.username}</button>
      <button class="load-albums">ALBUMS BY ${user.username}</button>
    </footer>
  </div>`).data('user', user);
    return userElement;
}

function renderUserList(userList) {
    $('#user-list').empty();
    userList.forEach(function(user) {
        const userElement = renderUser(user);
        $('#user-list').append(userElement);
    })
}

/** Click Handlers */

$('#user-list').on('click', '.user-card .load-posts', function() {
    const user = $(this).closest('.user-card').data('user');
    fetchUserPosts(user.id).then(renderPostList);
});

$('#user-list').on('click', '.user-card .load-albums', function() {
    const user = $(this).closest('.user-card').data('user');
    fetchUserAlbumList(user.id).then(renderAlbumList);

});

$('#post-list').on('click', '.post-card .toggle-comments', function() {
    const postCardElement = $(this).closest('.post-card');
    const post = postCardElement.data('post');
    console.log(post);
    setCommentsOnPost(post)
        .then(function(post) {
            const findCommentList = postCardElement.find('.comment-list');
            findCommentList.empty();
            post.comments.forEach(function(comment) {
                const commentElement = $(`<h3> ${comment.body} ${comment.email} <h3>`);
                $(findCommentList).prepend(commentElement);
                toggleComments(postCardElement);
            })
        })
        .catch(function() {
            toggleComments(postCardElement);
        });
});

/** Album Data Functions */

function renderAlbum(album) {
    const albumElement = $(`
    <div class="album-card">
    <header>
  <h3>${album.title}, by ${album.user.username} </h3>
    </header>
    <section class="photo-list">
    </section>
    </div>`);
    album.photos.forEach(photoList => {
        const photoListElement = renderPhoto(photoList);
        $('.photo-list').append(photoListElement);
    })
    return albumElement;
}

/* render a single photo */
function renderPhoto(photo) {
    const photoElement = $(`<div class="photo-card">
    <a href="${photo.url}" target="_blank">
      <img src="${photo.thumbnailUrl}">
      <figure>${photo.title}</figure>
    </a>
  </div>`);
    return photoElement;
}

/* render an array of albums */
function renderAlbumList(albumList) {
    $('#app section').removeClass('active');
    $('#album-list').addClass('active');
    $('#album-list').empty();

    albumList.forEach(function(album) {
        const albumElement = renderAlbum(album);
        $('#album-list').append(albumElement);
    })
}

/** Posts Data Functions */

function setCommentsOnPost(post) {
    if (post.comments) {
        return Promise.reject(null);
    }
    return fetchPostComments(post.id)
        .then(function(comments) {
            post.comments = comments;
            return post;
        });
}

function renderPost(post) {
    const postElement = $(`<div class="post-card">
    <header>
      <h3>${post.title}</h3>
      <h3>--- ${post.user.username}</h3>
    </header>
    <p>${post.body}</p>
    <footer>
      <div class="comment-list"></div>
      <a href="#" class="toggle-comments">(<span class="verb">show</span> comments)</a>
    </footer>
  </div>`);

    return postElement;
}

function renderPostList(postList) {
    $('#app section').removeClass('active');
    $('#post-list').addClass('active');
    $('#post-list').empty();

    postList.forEach(function(post) {
        const postElement = renderPost(post);
        $('#post-list').append(postElement);
    })
}

function toggleComments(postCardElement) {
    const footerElement = postCardElement.find('footer');

    if (footerElement.hasClass('comments-open')) {
        footerElement.removeClass('comments-open');
        footerElement.find('.verb').text('show');
    } else {
        footerElement.addClass('comments-open');
        footerElement.find('.verb').text('hide');
    }
}