import { css } from 'emotion'
import hms from '../src'

const bodyScale = [0, 3]
const h1Scale = [3, 0]

document.body.className = css`
  ${hms.sizes(bodyScale)}
`

const h1 = document.createElement('h1')
const p = document.createElement('p')

h1.textContent = 'harmonic-modular-scale'
p.textContent = 'Hello, world!'

h1.className = css`
  ${hms.sizes(h1Scale)}
  margin-top: ${hms.getLineHeight(bodyScale, 3)};
  margin-bottom: ${hms.getLineHeight(0, 3, 2)};
`

p.className = css`
  margin-top: ${hms.getLineHeight(bodyScale)};
  margin-bottom: ${hms.getLineHeight(bodyScale)};
`

document.body.appendChild(h1)
document.body.appendChild(p)
