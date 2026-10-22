/**
 * SanearCheck Pro - Carregador e Ponte WebAssembly para LibreDWG
 */
window.LibreDWGEngine = {
  isReady: false,
  wasmModule: null,

  async init() {
    try {
      const response = await fetch('libredwg.wasm');
      if (!response.ok) {
        throw new Error('Ficheiro libredwg.wasm não localizado no repositório.');
      }
      const buffer = await response.arrayBuffer();
      const wasmInstance = await WebAssembly.instantiate(buffer, {
        env: {
          memory: new WebAssembly.Memory({ initial: 256, maximum: 512 }),
          abort: () => console.error('WASM Aborted')
        }
      });
      this.wasmModule = wasmInstance.instance;
      this.isReady = true;
      console.log('Motor WebAssembly LibreDWG inicializado com sucesso.');
      return true;
    } catch (err) {
      console.warn('Execução via interpretador estático:', err.message);
      return false;
    }
  }
};

window.addEventListener('DOMContentLoaded', () => {
  if (window.LibreDWGEngine) {
    window.LibreDWGEngine.init();
  }
});
