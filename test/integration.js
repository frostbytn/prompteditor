import { createLLamaContext } from 'https://esm.sh/llama-cpp-wasm@0.1.2';

async function run() {
  try {
    const ctx = await createLLamaContext({
      wasmURL: 'https://esm.sh/llama-cpp-wasm@0.1.2/llama-cpp.wasm',
      modelURL: 'https://huggingface.co/TheBloke/TinyLlama-1.1B-Chat-v1.0-GGUF/resolve/main/tinyllama-1.1b-chat-v1.0.q4_0.gguf',
      nThreads: 1
    });
    const result = await ctx.run({ prompt: 'Hello,', nPredict: 1 });
    console.log('Generated token:', result);
  } catch (err) {
    console.error('Generation failed:', err);
    process.exitCode = 1;
  }
}
run();
