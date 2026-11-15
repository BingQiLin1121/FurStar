// ===== 1. 生成星空 =====
function createStars() {
    const container = document.getElementById('star-container');
    if (!container) return;
    container.innerHTML = ''; // 清空防止重复
    const starCount = Math.floor(window.innerWidth * window.innerHeight / 3000);
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
        star.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(star);
    }
}
createStars();
window.addEventListener('resize', createStars);

// ===== 3. 移动端菜单 =====
const menuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        const isVisible = navLinks.style.display === 'flex';
        navLinks.style.display = isVisible ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '60px';
        navLinks.style.right = '5%';
        navLinks.style.background = 'rgba(10,14,26,0.95)';
        navLinks.style.padding = '1.5rem';
        navLinks.style.borderRadius = '12px';
        navLinks.style.backdropFilter = 'blur(10px)';
        navLinks.style.gap = '1rem';
    });
}

// ===== 4. 滚动渐入动画 =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s, transform 0.6s';
    observer.observe(el);
});
