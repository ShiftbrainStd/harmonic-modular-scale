import { css } from 'emotion'
import { scale } from '../src'

const bodyScale = [0, 3]
const h1Scale = [3, 0]

document.body.className = css`
  ${scale.sizes(bodyScale)}
`

const h1 = document.createElement('h1')
const p = document.createElement('p')

h1.textContent = 'harmonic-modular-scale'
p.textContent = 'Hello, world!'

h1.className = css`
  ${scale.sizes(h1Scale)}
  margin-top: ${scale.getLineHeight(bodyScale, 3)};
  margin-bottom: ${scale.getLineHeight(0, 3, 2)};
`

p.className = css`
  margin-top: ${scale.getLineHeight(bodyScale)};
  margin-bottom: ${scale.getLineHeight(bodyScale)};
`

document.body.appendChild(h1)
document.body.appendChild(p)
