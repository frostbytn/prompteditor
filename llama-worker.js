// The @wllama/wllama ESM build expects a browser-like `document` global so it
// can resolve relative resources. Workers don't provide this by default. Create
// a minimal stub using `import.meta.url` at module load time so any subsequent
// imports see it immediately.
if (typeof globalThis.document === 'undefined') {
  globalThis.document = { currentScript: { src: import.meta.url } };
}

self.addEventListener('message', async (e) => {
  const { action, prompt } = e.data || {};
  try {
    if (action === 'init') {
      if (self.llama) {
        self.postMessage({ type: 'init' });
        return;
      }
      const { Wllama } = await import('https://cdn.jsdelivr.net/npm/@wllama/wllama@latest/esm/index.js');
      const wasmURL = 'https://cdn.jsdelivr.net/npm/@wllama/wllama@latest/esm/single-thread/wllama.wasm';
      const llama = new Wllama({ 'single-thread/wllama.wasm': wasmURL }, { parallelDownloads: 5, allowOffline: false });
      await llama.loadModelFromHF('TheBloke/rocket-3B-GGUF', 'rocket-3b.Q4_K_M.gguf');
      self.llama = llama;
      self.postMessage({ type: 'init' });
    } else if (action === 'generate') {
      if (!self.llama) {
        throw new Error('Model not initialized');
      }
      let out = '';
      for await (const chunk of self.llama.createCompletion(prompt, { nPredict: 64, temp: 0.7, topK: 40 })) {
        out += chunk;
      }
      self.postMessage({ type: 'result', text: out });
    }
  } catch (err) {
    self.postMessage({ type: 'error', message: String(err), stack: err && err.stack });
  }
});
