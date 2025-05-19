// js/products.js

document.addEventListener('DOMContentLoaded', () => {
  const productList   = document.getElementById('product-list');
  const compareBtn    = document.getElementById('compare-btn');
  const compareModal  = document.getElementById('compare-modal');
  const modalClose    = compareModal.querySelector('.modal-close');
  const modalBackdrop = compareModal.querySelector('.modal-backdrop');
  const compareTable  = compareModal.querySelector('.compare-table');

  const searchInput   = document.getElementById('search-input');
  const sortSelect    = document.getElementById('sort-select');

  let products = [];
  let selected = [];

  // URLパラメータからカテゴリを取得
  function getCategory() {
    return new URLSearchParams(window.location.search).get('category');
  }

  // JSON読み込み
  fetch('assets/data/products.json')
    .then(res => res.json())
    .then(data => {
      products = data;
      renderProducts();
      // イベントリスナー登録
      searchInput.addEventListener('input', renderProducts);
      sortSelect.addEventListener('change', renderProducts);
    })
    .catch(err => console.error('products.json の読み込みに失敗:', err));

  // 商品レンダリング: フィルタ＋ソート適用
  function renderProducts() {
    const category  = getCategory();
    const keyword   = searchInput.value.trim().toLowerCase();
    const sortKey   = sortSelect.value;

    // フィルタ処理
    let items = (category
      ? products.filter(p => p.category === category)
      : products
    ).filter(p => p.name.toLowerCase().includes(keyword));

    // ソート処理
    if (sortKey === 'price-asc') {
      items.sort((a, b) => a.price - b.price);
    } else if (sortKey === 'price-desc') {
      items.sort((a, b) => b.price - a.price);
    } else if (sortKey === 'rating-desc') {
      items.sort((a, b) => b.rating - a.rating);
    }

    // DOMクリア
    productList.innerHTML = '';
    selected = [];  // ソート/検索後は比較選択リセット
    updateCompareBtn();

    // カード生成
    items.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.dataset.id = p.id;
      card.innerHTML = `
        <img src="${p.thumbnail}" alt="${p.name}" />
        <h3>${p.name}</h3>
        <p class="price">¥${p.price.toLocaleString()}</p>
        <p class="rating">
          ${'★'.repeat(Math.floor(p.rating))}
          ${p.rating % 1 ? '½' : ''}
          (${p.rating})
        </p>
        <a href="product-detail.html?id=${p.id}" class="btn-detail">詳細を見る</a>
        <label class="compare-label">
          <input type="checkbox" class="compare-checkbox" />
          比較に追加
        </label>
      `;
      const checkbox = card.querySelector('.compare-checkbox');
      checkbox.addEventListener('change', e => toggleSelection(p, e.target.checked));
      productList.appendChild(card);
    });
  }

  // 比較選択のON/OFF
  function toggleSelection(product, isChecked) {
    if (isChecked) {
      if (selected.length >= 3) {
        alert('比較は最大3件まで選択できます。');
        document.querySelector(`.product-card[data-id="${product.id}"] .compare-checkbox`).checked = false;
        return;
      }
      selected.push(product);
    } else {
      selected = selected.filter(p => p.id !== product.id);
    }
    updateCompareBtn();
  }

  // 比較ボタン制御
  function updateCompareBtn() {
    compareBtn.disabled = selected.length < 2;
  }

  // 比較モーダル表示
  compareBtn.addEventListener('click', () => {
    buildCompareTable();
    compareModal.classList.add('open');
  });

  // 比較テーブル生成
  function buildCompareTable() {
    compareTable.innerHTML = '';
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>スペック</th>' + selected.map(p => `<th>${p.name}</th>`).join('');
    thead.appendChild(headerRow);
    compareTable.appendChild(thead);

    const tbody = document.createElement('tbody');
    const specKeys = Array.from(new Set(selected.flatMap(p => Object.keys(p.specs))));
    specKeys.forEach(key => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${key}</td>` + selected.map(p => `<td>${p.specs[key] || '-'}</td>`).join('');
      tbody.appendChild(row);
    });
    compareTable.appendChild(tbody);
  }

  // モーダル閉じる
  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
  window.addEventListener('keydown', e => e.key === 'Escape' && closeModal());
  function closeModal() {
    compareModal.classList.remove('open');
  }
});
