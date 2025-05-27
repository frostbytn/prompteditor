import { Wllama } from 'https://cdn.jsdelivr.net/npm/@wllama/wllama@2.3.1/esm/index.js';

async function run() {
  try {
    const wasmURL = 'https://cdn.jsdelivr.net/npm/@wllama/wllama@2.3.1/esm/single-thread/wllama.wasm';
    // Use a smaller TheBloke 3B model (~60 MB) to reduce copy size
    const modelURL = 'https://huggingface.co/TheBloke/rocket-3B-GGUF/resolve/main/rocket-3b.Q4_K_M.gguf';
    const llama = new Wllama({ 'single-thread/wllama.wasm': wasmURL });
    await llama.loadModelFromUrl(modelURL);
    const out = await llama.createCompletion('Hello,', { nPredict: 1 });
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
