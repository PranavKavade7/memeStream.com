// Global variables
let comments = JSON.parse(localStorage.getItem('comments')) || [];
let videoComments = JSON.parse(localStorage.getItem('videoComments')) || [];
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || {};
let currentUsername = localStorage.getItem('username');

// Set username
function setUsername() {
    const usernameInput = document.getElementById('username-input');
    const usernameMessage = document.getElementById('username-message');
    currentUsername = usernameInput.value;

    if (currentUsername) {
        localStorage.setItem('username', currentUsername);
        usernameMessage.innerText = 'Username saved successfully!';
    }
}

// Display typing status
function userTyping() {
    const typingMessage = document.getElementById('typing-message');
    if (currentUsername) {
        typingMessage.innerText = `${currentUsername} is typing...`;
    }
}

// Add a comment for the image
function addComment() {
    const commentInput = document.getElementById('comment-input');
    const commentMessage = document.getElementById('comment-message');
    const commentText = commentInput.value;

    if (commentText && currentUsername) {
        comments.push({
            text: commentText,
            username: currentUsername,
            likes: 0,
            likedBy: [],
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('comments', JSON.stringify(comments));
        commentInput.value = ''; // Clear input
        commentMessage.innerText = 'Comment added successfully!';
        displayComments();
    } else {
        commentMessage.innerText = 'Please enter a valid comment!';
    }
}

// Display comments for the image
function displayComments() {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '';

    comments.forEach((comment, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('comment-item');
        listItem.innerHTML = `
            <span>${comment.username}: ${comment.text} (${getTimeDifference(comment.timestamp)})</span>
            <div class="comment-actions">
                <button onclick="likeComment(${index})">👍 ${comment.likes}</button>
            </div>
        `;
        commentsList.appendChild(listItem);
    });
}

// Like a comment
function likeComment(index) {
    const comment = comments[index];
    if (!comment.likedBy.includes(currentUsername)) {
        comment.likes++;
        comment.likedBy.push(currentUsername);
        updateLeaderboard(comment.username);
        localStorage.setItem('comments', JSON.stringify(comments));
        displayComments();
        displayLeaderboard();
    }
}

// Update leaderboard
function updateLeaderboard(username) {
    leaderboard[username] = (leaderboard[username] || 0) + 1;
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

// Display leaderboard
function displayLeaderboard() {
    const leaderboardList = document.getElementById('leaderboard');
    leaderboardList.innerHTML = '';

    const sortedLeaderboard = Object.entries(leaderboard).sort((a, b) => b[1] - a[1]);
    sortedLeaderboard.forEach(([username, score]) => {
        const listItem = document.createElement('li');
        listItem.innerText = `${username}: ${score} likes`;
        leaderboardList.appendChild(listItem);
    });
}

// Add a comment for the video
function addVideoComment() {
    const videoCommentInput = document.getElementById('video-comment-input');
    const videoCommentMessage = document.getElementById('video-comment-message');
    const videoCommentText = videoCommentInput.value;

    if (videoCommentText && currentUsername) {
        videoComments.push({
            text: videoCommentText,
            username: currentUsername,
            likes: 0,
            likedBy: [],
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('videoComments', JSON.stringify(videoComments));
        videoCommentInput.value = ''; // Clear input
        videoCommentMessage.innerText = 'Comment added successfully!';
        displayVideoComments();
    } else {
        videoCommentMessage.innerText = 'Please enter a valid comment!';
    }
}

// Display comments for the video
function displayVideoComments() {
    const videoCommentsList = document.getElementById('video-comments-list');
    videoCommentsList.innerHTML = '';

    videoComments.forEach((comment, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('comment-item');
        listItem.innerHTML = `
            <span>${comment.username}: ${comment.text} (${getTimeDifference(comment.timestamp)})</span>
            <div class="comment-actions">
                <button onclick="likeVideoComment(${index})">👍 ${comment.likes}</button>
            </div>
        `;
        videoCommentsList.appendChild(listItem);
    });
}

// Like a video comment
function likeVideoComment(index) {
    const comment = videoComments[index];
    if (!comment.likedBy.includes(currentUsername)) {
        comment.likes++;
        comment.likedBy.push(currentUsername);
        updateVideoLeaderboard(comment.username);
        localStorage.setItem('videoComments', JSON.stringify(videoComments));
        displayVideoComments();
        displayLeaderboard();
    }
}

// Update video leaderboard
function updateVideoLeaderboard(username) {
    leaderboard[username] = (leaderboard[username] || 0) + 1;
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

// Time difference helper function (assuming you have this implemented)
function getTimeDifference(timestamp) {
    const now = new Date();
    const commentTime = new Date(timestamp);
    const timeDiff = Math.abs(now - commentTime); // Difference in milliseconds
    const seconds = Math.floor(timeDiff / 1000);

    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
}

// Refresh comments
function refreshComments() {
    displayComments();
}

// Refresh video comments
function refreshVideoComments() {
    displayVideoComments();
}

// Initial display of comments and leaderboard
displayComments();
displayVideoComments();
displayLeaderboard();
