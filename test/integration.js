import { createLLamaContext } from 'https://cdn.jsdelivr.net/gh/tangledgroup/llama-cpp-wasm@main/dist/llama-mt/llama.js';

async function run() {
  try {
    const ctx = await createLLamaContext({
      wasmURL: 'https://cdn.jsdelivr.net/gh/tangledgroup/llama-cpp-wasm@main/dist/llama-mt/llama-cpp.wasm',
      modelURL: 'https://huggingface.co/TheBloke/TinyLlama-1.1B-Chat-v1.0-GGUF/resolve/main/tinyllama-1.1b-chat-v1.0.q4_0.gguf',
      nThreads: 1
    });
    const result = await ctx.run({ prompt: 'Hello,', nPredict: 1 });
    console.log('Generated token:', Array.isArray(result) ? result.join('') : result);
  } catch (err) {
    console.error('Generation failed:', err);
    if(err && err.stack){
      console.error(err.stack);
    }
    process.exitCode = 1;
  }
}
run();
