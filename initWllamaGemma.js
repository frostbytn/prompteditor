async function ensureLlamaContext() {
  if (this.llamaCtx) return;
  this.log('Initializing WLLama context…');
  const wasmURL  = 'https://cdn.jsdelivr.net/npm/@wllama/wllama@latest/esm/single-thread/wllama.wasm';
  const modelRepo = 'google/gemma-3-1b-it-qat-q4_0-gguf';          // [Gemma 3 1B Q4_0]
  const modelFile = 'gemma-3-1b-it-qat-q4_0.gguf';

  try {
    const { Wllama } = await import('https://cdn.jsdelivr.net/npm/@wllama/wllama@latest/esm/index.js');
    // force single-thread + serial downloads to avoid iOS OPFS bugs
    const llama = new Wllama(
      { 'single-thread/wllama.wasm': wasmURL },
      { parallelDownloads: 1, allowOffline: false }
    );

    this.log('Loading model from ' + modelRepo + '/' + modelFile);
    await llama.loadModelFromHF(modelRepo, modelFile);
    this.llamaCtx = llama;
    this.log('Model loaded.');
  } catch(err) {
    this.log('Context init failed: ' + err);
    throw err;
  }
}
