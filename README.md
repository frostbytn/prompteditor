# promptbin

A lightweight client-side web app for building and previewing prompt templates for large language models. It runs entirely in the browser and is suitable for hosting on GitHub Pages.

## Features

- Create any number of prompt sections with customizable tag syntax.
- Quickly add common section types like `system`, `example`, `task` and `implementation`.
- Manage variables in a dynamic key/value list.
- Render the final prompt live as plain text.
- Darker flattened theme built with Tailwind CSS and Alpine.js with optional light mode.
- Icon-based buttons for a compact interface.
- Reorder sections via drag and drop.
- Animated interactions with feedback when copying the rendered prompt.
- Test prompts locally with a lightweight in-browser Llama model executed inside a Web Worker.
- Displays estimated token count for the rendered prompt.
- Built-in starter templates for code assistants and document extraction.
- Separate settings page to manage preferences.
- Upload files and automatically capture their text in a `[files]` section.

## Usage

Open `index.html` in a browser. No build step or server is required.

Click the play button next to the token count to run your prompt through a lightweight LLaMA model powered by `llama.cpp` compiled to WebAssembly. The runtime and model are loaded at runtime from public CDNs and the model executes inside a Web Worker.

Open DevTools → Network and confirm that the WASM and model files return **200**.

The page initially loads with a sample task that asks the model to briefly describe what a northern Minnesotan cedar tree looks like, so you can try it out immediately. Feel free to customize the default template and styling.
