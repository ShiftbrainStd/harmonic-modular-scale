import * as CSS from 'csstype'

export type ScalarSizes =
  | [CSS.Properties['fontSize']]
  | [CSS.Properties['fontSize'], CSS.Properties['lineHeight']]

export interface ScalarStyles {
  fontSize: CSS.Properties['fontSize']
  lineHeight: CSS.Properties['lineHeight']
  [key: string]: any
}

export interface ModularScale {
  getSizes(fontSize: number[]): ScalarSizes
  getSizes(fontSize: number, lineHeight?: number): ScalarSizes
  getFontSize(degree: number): CSS.Properties['fontSize']
  getLineHeight(fsDeg: number[], lines?: number): CSS.Properties['lineHeight']
  getLineHeight(
    fsDeg: number,
    lineHeightDegree?: number,
    lines?: number,
    asLineHeight?: boolean
  ): CSS.Properties['lineHeight']

  sizes(fontSize: number[]): ScalarStyles
  sizes(fontSize: number, lineHeight?: number): ScalarStyles
}
