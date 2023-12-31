export default function setMatrixStyle ({ gap }) {
  const style = document.createElement('style')
  document.body.appendChild(style)
  style.textContent = `
    .matrix {
      width: 100vw;
      height: 100vh;
      display: flex;
    }

    .matrix-grid {
      display: grid;
      gap: ${gap}px;
      width: max-content;
      height: max-content;
      margin: auto;
    }

    .pixel {
      display: block;
      width: 100%;
      height: 100%;
      background: var(--background);
      border-radius: 5px;
      transition: background 0.1s;
      cursor: pointer;
    }

    .pixel:hover {
      background: var(--text-primary);
    }

    .pixel.on {
      background: var(--text-primary);
    }
  `
}