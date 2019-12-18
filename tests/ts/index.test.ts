import { scale, createScale } from '../../src'

const scaleNoCalc = createScale({ useCalc: false })

describe('Scale module', () => {
  describe('getLineHeight()', () => {
    test('returns a line-height value', () => {
      expect(scale.getLineHeight(1, 2)).toBe('calc(1rem * 8 / 7 * 49 / 32)')

      expect(scaleNoCalc.getLineHeight(1, 2)).toBe(`${((8 / 7) * 49) / 32}rem`)
    })

    test('returns a line-height relative to the font size', () => {
      expect(scale.getLineHeight(1, 2, 1, true)).toBe(`calc(1em * 49 / 32)`)

      expect(scaleNoCalc.getLineHeight(1, 2, 1, true)).toBe((1 * 49) / 32)
    })
    test('returns a line-height value spanning multiple line', () => {
      expect(scale.getLineHeight(1, 2, 2)).toBe(
        `calc(1rem * 8 / 7 * 49 / 32 * 2)`
      )

      expect(scaleNoCalc.getLineHeight(1, 2, 2)).toBe(
        `${(((8 / 7) * 49) / 32) * 2}rem`
      )
    })

    test('accepts arguments as a single list', () => {
      expect(scale.getLineHeight([1, 2, 2])).toBe(
        `calc(1rem * 8 / 7 * 49 / 32 * 2)`
      )
    })
  })

  describe('getFontSize', () => {
    test('returns a font size value', () => {
      expect(scale.getFontSize(2)).toBe(`calc(1rem * 8 / 6)`)
    })
    test('returns a get-font-size value without calc', () => {
      expect(scaleNoCalc.getFontSize(2)).toBe(`${8 / 6}rem`)
    })
  })

  describe('getSizes', () => {
    test('calls get-line-height and get-font-size', () => {
      const fs = scale.getFontSize(1)
      const lh = scale.getLineHeight(1, 2, 1, true)
      expect(scale.getSizes(1, 2)).toEqual([fs, lh])
    })
  })

  describe('sizes', () => {
    test('outputs the result from getSizes', () => {
      const [fontSize, lineHeight] = scale.getSizes(1, 2)

      const expected = {
        fontSize,
        lineHeight,
      }

      expect(scale.sizes(1, 2)).toEqual(expected)
    })
  })
})
