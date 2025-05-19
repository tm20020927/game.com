// js/recommend.js

document.addEventListener('DOMContentLoaded', () => {
  const recContainer = document.getElementById('recommended-articles');

  // ① blog.js で定義した window.blogPosts を利用
  const posts = window.blogPosts || [];

  // 配列をシャッフルして先頭 count 件を返す
  function getRandomItems(array, count) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, count);
  }

  // おすすめ記事をレンダリング
  function renderRecommendations() {
    recContainer.innerHTML = '';
    const picks = getRandomItems(posts, 3);

    picks.forEach(post => {
      const card = document.createElement('article');
      card.className = 'post-card';
      card.innerHTML = `
        <a href="${post.url}">
          <img src="${post.thumbnail}" alt="${post.title}">
          <h2>${post.title}</h2>
        </a>
      `;
      recContainer.appendChild(card);
    });
  }

  // 初回描画と定期更新
  renderRecommendations();
  setInterval(renderRecommendations, 6 * 60 * 60 * 1000);
});
