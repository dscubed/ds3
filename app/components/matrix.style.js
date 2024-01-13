export default function setMatrixStyle ({ id, gap, radius, offColor, onColor }) {
  const style = document.createElement('style')
  document.body.appendChild(style)
  style.textContent = `
    #${id} {
      width: 100%;
      height: 100%;
      display: flex;
      overflow: hidden;
    }

    #${id} .matrix-grid {
      display: grid;
      gap: ${gap}px;
      width: max-content;
      height: max-content;
      margin: auto;
    }

    #${id} .pixel {
      display: block;
      width: 100%;
      height: 100%;
      background: ${offColor};
      border-radius: ${radius}px;
      transition: background 0.1s, opacity 0.1s;
    }

    #${id} .pixel.on {
      background: ${onColor};
    }
  `
}