// js/detail.js

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  
  if (!productId) {
    alert('商品IDが指定されていません。');
    return;
  }

  fetch('assets/data/products.json')
    .then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then(products => {
      const product = products.find(p => p.id === productId);
      if (!product) {
        alert('指定された商品が見つかりませんでした。');
        return;
      }

      // メイン画像
      const mainImg = document.getElementById('gallery-main-img');
      mainImg.src = product.thumbnail;
      mainImg.alt = product.name;

      // サムネイルリスト（現状はサムネイル画像のみですが、必要に応じて images 配列を拡張できます）
      const thumbList = document.getElementById('thumbnail-list');
      thumbList.innerHTML = '';
      const thumbImg = document.createElement('img');
      thumbImg.src = product.thumbnail;
      thumbImg.alt = product.name;
      thumbImg.className = 'thumbnail-img';
      thumbImg.addEventListener('click', () => {
        mainImg.src = product.thumbnail;
      });
      thumbList.appendChild(thumbImg);

      // 商品情報の埋め込み
      document.getElementById('product-name').textContent   = product.name;
      document.getElementById('product-price').textContent  = `¥${product.price.toLocaleString()}`;

      // 星評価表示
      const ratingEl = document.getElementById('product-rating');
      const fullStars = Math.floor(product.rating);
      const halfStar  = product.rating % 1 >= 0.5;
      ratingEl.textContent = 
        '★'.repeat(fullStars) +
        (halfStar ? '½' : '') +
        ` (${product.rating})`;

      // 購入ボタンにリンク設定
      const purchaseBtn = document.getElementById('purchase-btn');
      purchaseBtn.href = product.affiliateLink;

      // スペック表を生成
      const specTable = document.getElementById('spec-table');
      specTable.innerHTML = ''; // 既存行があればクリア
      for (const [key, value] of Object.entries(product.specs)) {
        const row = document.createElement('tr');
        const th  = document.createElement('th');
        const td  = document.createElement('td');
        th.textContent = key;
        td.textContent = value;
        row.append(th, td);
        specTable.appendChild(row);
      }
    })
    .catch(err => {
      console.error('商品データの読み込み中にエラーが発生しました:', err);
      alert('商品情報の取得に失敗しました。時間をおいて再度お試しください。');
    });
});
