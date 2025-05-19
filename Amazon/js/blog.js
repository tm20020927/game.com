// js/blog.js

// ① 記事データをグローバルに公開
window.blogPosts = [
  {
    id: 'post1',
    title: '最強ゲーミングマウス5選【2025年最新版】',
    thumbnail: 'assets/images/posts/post1-thumbnail.jpg',
    url: 'post/post1.html'
  },
  {
    id: 'post2',
    title: 'プロゲーマー御用達キーボード比較レビュー',
    thumbnail: 'assets/images/posts/post2-thumbnail.jpg',
    url: 'post/post2.html'
  },
  {
    id: 'post3',
    title: 'マウスパッド選びのコツとおすすめモデル',
    thumbnail: 'assets/images/posts/post3-thumbnail.jpg',
    url: 'post/post3.html'
  },
  {
    id: 'post4',
    title: '144Hz対応モニターで変わるゲーム体験',
    thumbnail: 'assets/images/posts/post4-thumbnail.jpg',
    url: 'post/post4.html'
  }
  // 他の記事を追加したい場合はここにオブジェクトを追加
];

document.addEventListener('DOMContentLoaded', () => {
  const postListEl = document.querySelector('.post-list');
  postListEl.innerHTML = '';

  // ② window.blogPosts を使って記事一覧を生成
  window.blogPosts.forEach(post => {
    const article = document.createElement('article');
    article.className = 'post-card';
    article.innerHTML = `
      <a href="${post.url}">
        <img src="${post.thumbnail}" alt="${post.title}">
        <h2>${post.title}</h2>
      </a>
    `;
    postListEl.appendChild(article);
  });
});
