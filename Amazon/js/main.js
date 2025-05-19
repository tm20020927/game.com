document.addEventListener('DOMContentLoaded', () => {
  // ハンバーガーメニュー開閉処理
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    siteNav.classList.toggle('open');
  });

  // カルーセル（スライドショー）機能
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const prevButton = document.querySelector('.carousel-prev');
  const nextButton = document.querySelector('.carousel-next');
  let currentIndex = 0;

  // カルーセル位置調整関数
  const updateCarousel = () => {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  };

  // 前へボタン
  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  // 次へボタン
  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });

  // リサイズ時に再計算
  window.addEventListener('resize', updateCarousel);

  // 初期表示
  updateCarousel();
});
