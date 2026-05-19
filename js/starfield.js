const sf = document.getElementById('starfield');
for (let i = 0; i < 100; i++) {
    const d = document.createElement('div');
    d.className = 'twinkle';
    const sz = Math.random() * 1.8 + 0.4;
    d.style.cssText = `width:${sz}px;height:${sz}px;top:${Math.random() * 100}%;left:${Math.random() * 100}%;--dur:${(Math.random() * 4 + 2).toFixed(1)}s;--del:${(Math.random() * 6).toFixed(1)}s;--op:${(Math.random() * 0.5 + 0.2).toFixed(2)};`;
    sf.appendChild(d);
}