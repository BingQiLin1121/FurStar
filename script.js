// ===== 1. 生成星空背景 =====
function createStars() {
    const container = document.getElementById('star-container');
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
window.addEventListener('resize', () => {
    document.getElementById('star-container').innerHTML = '';
    createStars();
});

// ===== 2. 一键复制IP =====
const ipBox = document.getElementById('ipBox');
const toast = document.getElementById('copyToast');
const SERVER_IP = '请到QQ群里获取'; // ← 修改为你的真实IP

ipBox.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(SERVER_IP);
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    } catch {
        // 降级方案
        const ta = document.createElement('textarea');
        ta.value = SERVER_IP;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    }
});

// ===== 3. 模拟在线人数（替换为真实API） =====
async function fetchPlayerCount() {
    const el = document.getElementById('playerCount');
    try {
        // 使用 mcsrvstat.us 免费API，替换为你的真实IP
        const res = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`);
        const data = await res.json();
        if (data.online) {
            el.textContent = `当前在线: ${data.players.online} / ${data.players.max}`;
        } else {
            el.textContent = '服务器暂时离线 💤';
            document.querySelector('.status-dot').style.background = '#f87171';
            document.querySelector('.status-dot').style.boxShadow = '0 0 8px #f87171';
        }
    } catch {
        el.textContent = '在线人数获取失败';
    }
}
fetchPlayerCount();
setInterval(fetchPlayerCount, 60000); // 每分钟刷新

// ===== 4. 移动端菜单 =====
document.querySelector('.mobile-menu-btn').addEventListener('click', () => {
    const nav = document.querySelector('.nav-links');
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.top = '60px';
    nav.style.right = '5%';
    nav.style.background = 'rgba(10,14,26,0.95)';
    nav.style.padding = '1.5rem';
    nav.style.borderRadius = '12px';
    nav.style.backdropFilter = 'blur(10px)';
});

// ===== 5. 滚动渐入动画 =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s, transform 0.6s';
    observer.observe(el);
});