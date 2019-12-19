import { trunc, toNumber, getUnit } from '../../src/utilities'

describe('Utilities', () => {
  describe('trunc()', () => {
    test.each([
      [-1.5, -1],
      [1.5, 1],
      [0.5, 0],
    ])('rounds %d to %d', (num, expected) => {
      expect(trunc(num)).toBe(expected)
    })
  })

  describe('toNumber()', () => {
    test.each([
      ['2.5rem', 2.5],
      [2.3333, 2.3333],
    ])('parses %s into %d', (value, expected) => {
      expect(toNumber(value)).toBe(expected)
    })
  })

  describe('getUnit()', () => {
    test.each([
      ['10px', 'px'],
      [100, 'px'],
      ['10%', '%'],
      ['10', ''],
    ])('Unit for %s is %s', (value, expected) => {
      expect(getUnit(value)).toBe(expected)
    })
  })
})
