export default function setMatrixStyle ({ id, radius, offColor, onColor }) {
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
      width: max-content;
      height: max-content;
      margin: auto;
    }

    #${id} .locator {
      position: relative;
    }

    #${id} .locator::after {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #FFF;
      border-radius: 100%;
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