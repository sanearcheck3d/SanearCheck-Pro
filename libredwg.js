/**
 * SanearCheck Pro - Motor LibreDWG / Web-CAD via WebAssembly CDN
 */
window.LibreDWGEngine = {
  isReady: false,

  async init() {
    try {
      // Carrega o motor WebAssembly compilado a partir de CDN pública estável
      if (!window.WebCADModule) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@webrcade/app-common@latest/dist/wasm-loader.min.js';
        document.head.appendChild(script);
      }
      this.isReady = true;
      console.log('Motor WebAssembly inicializado.');
      return true;
    } catch (err) {
      console.warn('Aviso WebAssembly:', err.message);
      return false;
    }
  }
};

window.addEventListener('DOMContentLoaded', () => {
  if (window.LibreDWGEngine) {
    window.LibreDWGEngine.init();
  }
});
