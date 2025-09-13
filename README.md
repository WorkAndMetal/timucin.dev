timucin.dev — VS Code benzeri portfolyo
======================================

Bu depo, Atakan Timuçin için Visual Studio Code arayüzüne benzeyen, statik/PWA destekli bir portfolyo sitesidir.

Özellikler
- VS Code benzeri layout: Activity Bar, Sidebar (Explorer), Tab bar, Editor, Panel, Status Bar
- Dosya sekmeleri ve içerik görüntüleme (Markdown/HTML/Code)
- Quick Open (Ctrl+P), Panel (Ctrl+J), Sidebar (Ctrl+B), Tema (Ctrl+K Ctrl+T)
- Light/Dark tema ve kalıcılık (localStorage)
- PWA: manifest + service worker ile offline cache

Geliştirme
- Herhangi bir statik sunucu ile çalışır. Örn:

  1) Python ile hızlı sunucu
	  python3 -m http.server 8000

  2) Node ile (serve kuruluysa)
	  npx serve . -p 8000

  Ardından tarayıcıda http://localhost:8000 adresini açın.

Dağıtım
- Vercel, Netlify, GitHub Pages gibi statik barındırmaya uygundur.

Lisans
- MIT
# timucin.dev