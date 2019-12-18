import invariant from 'tiny-invariant'
import { Properties } from 'csstype'
import { trunc, toNumber, getUnit } from './utilities'
import { ModularScale, ScalarSizes, ScalarStyles } from '../types'

export function createScale({
  scaleFactor = 8,
  baseFontSize = '1rem',
  lineHeightUnit = '0.25rem',
  useCalc = true,
} = {}): ModularScale {
  const lineHeightUnitNum = toNumber(lineHeightUnit)
  const baseFontSizeNum = toNumber(baseFontSize)
  const unit = getUnit(baseFontSize)

  function getFontSize(degree: number): Properties['fontSize'] {
    const deg = trunc(degree)
    const diff = scaleFactor - deg

    if (deg === 0) {
      return baseFontSize
    }

    if (useCalc) {
      return `calc(${baseFontSize} * ${scaleFactor} / ${diff})`
    }

    return `${(baseFontSizeNum * scaleFactor) / diff}${unit}`
  }

  function getLineHeight(
    fsDeg: unknown,
    lineHeightDegree?: unknown,
    lines = 1,
    asLineHeight = false
  ): Properties['lineHeight'] {
    let fs
    let lh
    let ls

    if (Array.isArray(fsDeg)) {
      ;[fs, lh, ls = (lineHeightDegree as number) || lines] = fsDeg
    } else {
      fs = fsDeg
      lh = lineHeightDegree
      ls = lines
    }

    invariant(
      typeof lh === 'number' && Number.isInteger(lh),
      `You must provide an integer as the line height value. Detected: "${lh}"`
    )

    invariant(
      typeof ls === 'number',
      `Invalid lines parameter. Detected: "${ls}"`
    )

    fs = trunc(fs)
    lh = trunc(lh)
    ls = trunc(ls)
    const diff = scaleFactor - fs
    const fontSize = (baseFontSizeNum * scaleFactor) / diff
    let baseLineHeightMultiple = 1

    while (lineHeightUnitNum * baseLineHeightMultiple < fontSize) {
      baseLineHeightMultiple += 1
    }

    const lhN = (baseLineHeightMultiple + lh) * diff
    const lhD = (baseFontSizeNum / lineHeightUnitNum) * scaleFactor

    if (asLineHeight) {
      if (lhN === lhD) {
        return 1
      }
      return useCalc ? `calc(1em * ${lhN} / ${lhD})` : lhN / lhD
    }

    if (!useCalc) {
      return `${((fontSize * lhN) / lhD) * ls}${unit}`
    }

    const lsMult = ls !== 1 ? ` * ${ls}` : ''

    if (lhN === lhD) {
      return scaleFactor === diff
        ? baseFontSizeNum * ls
        : `calc(${baseFontSize} * ${scaleFactor} / ${diff}${lsMult})`
    }

    if (scaleFactor === diff) {
      return `calc(${baseFontSize} * ${lhN} / ${lhD}${lsMult})`
    }

    return `calc(${baseFontSize} * ${scaleFactor} / ${diff} * ${lhN} / ${lhD}${lsMult})`
  }

  function getSizes(
    fontSize: number | number[],
    lineHeight?: number
  ): ScalarSizes {
    let fsDeg: number
    let lhDeg: number | undefined

    if (Array.isArray(fontSize)) {
      ;[fsDeg, lhDeg] = fontSize
    } else {
      fsDeg = fontSize
      lhDeg = lineHeight
    }

    return [
      getFontSize(fsDeg),
      lhDeg !== undefined ? getLineHeight(fsDeg, lhDeg, 1, true) : lhDeg,
    ]
  }

  function sizes(
    fontSizeDeg: number | number[],
    lineHeightDeg?: number
  ): ScalarStyles {
    const [fontSize, lineHeight] = getSizes(fontSizeDeg, lineHeightDeg)
    return {
      fontSize,
      lineHeight,
    }
  }

  return {
    getSizes,
    getFontSize,
    getLineHeight,
    sizes,
  }
}

export const scale = createScale()
