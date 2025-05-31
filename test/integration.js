// The ESM bundle expects a browser-like `document` global to resolve
// resource URLs. Provide a minimal stub when running under Node.
if (typeof globalThis.document === 'undefined') {
  globalThis.document = { currentScript: { src: import.meta.url } };
}

import { Wllama } from 'https://cdn.jsdelivr.net/npm/@wllama/wllama@latest/esm/index.js';

async function run() {
  try {
    const wasmURL = 'https://cdn.jsdelivr.net/npm/@wllama/wllama@latest/esm/single-thread/wllama.wasm';
    const llama = new Wllama(
      { 'single-thread/wllama.wasm': wasmURL },
      { parallelDownloads: 5, allowOffline: false }
    );
    await llama.loadModelFromHF(
      'TheBloke/rocket-3B-GGUF',
      'rocket-3b.Q4_K_M.gguf'
    );
    let out = '';
    for await (const chunk of llama.createCompletion('Hello,', { nPredict: 1 })) {
      out += chunk;
    }
    console.log('Generated token:', out);
  } catch (err) {
    console.error('Generation failed:', err);
    if(err && err.stack){
      console.error(err.stack);
    }
    process.exitCode = 1;
  }
}
run();
