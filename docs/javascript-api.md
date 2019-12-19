# JavaScript API Usage

<!-- TOC -->

- [Default configuration](#default-configuration)
  - [`getFontSize`](#getfontsize)
  - [`getLineHeight`](#getlineheight)
    - [Multiple arguments](#multiple-arguments)
    - [Shorthand signature](#shorthand-signature)
  - [`getSizes`](#getsizes)
  - [`sizes`](#sizes)
  - [Setup](#setup)
  - [Integration with `polyrhythm-typography`](#integration-with-polyrhythm-typography)

<!-- /TOC -->

## Default configuration

`harmonic-modular-scale` comes with some opinionated default values based on an harmonic series with a scale factor of `8`.

To consume the module just import it.

```js
import hms from '@shiftbrainstd/harmonic-modular-scale'
```

The exported main object exposes four functions:

- `getFontSize`: returns a `font-size` value
- `getLineHeight`: returns a line height value
- `getSizes`: returns an array containing a `font-size` and an optional `line-height`.
- `sizes`: returns a CSS style object containing `font-size` and `line-height` properties. Uses `getSizes` internally.

### `getFontSize`

Accepts the following arguments:

| argument | type   | default | description                         |
| -------- | ------ | ------- | ----------------------------------- |
| `degree` | number |         | The font size in the harmonic scale |

Returns the computed `font-size` value.

### `getLineHeight`

Despite of its name this function can also be used to compute an harmonic vertical spacing for margins and paddings.

Accepts the following two signatures:

#### Multiple arguments

| argument       | type    | default | description                                                                                                     |
| -------------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| `degree`       | number  |         | The font size in the harmonic scale                                                                             |
| `lhDegree`     | number  |         | (optional) The increments of line height relative to the minimum height that can contain the current font size. |
| `lines`        | number  | 1       | Number of lines the line height should span                                                                     |
| `asLineHeight` | boolean | false   | Set to `true` to return a value suitable to be assigned to the `line-height` property                           |

#### Shorthand signature

| argument | type     | default | description                                                              |
| -------- | -------- | ------- | ------------------------------------------------------------------------ |
| `degree` | number[] |         | An array containing the above `degree`, `lhDegree` and `lines` argument. |
| `lines`  | number   | 1       | Number of lines the line height should span                              |

**Note: If the last element in the `degree` array is not defined the second argument will be used instead**

Returns the computed line height value.

### `getSizes`

Accepts the following arguments:

| argument           | type   | default | description                                                                                                                            |
| ------------------ | ------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `fontSizeDegree`   | number |         | An integer indicating the font size in the harmonic scale. The returned value will be relative to the base font size.                  |
| `lineHeightDegree` | number |         | (optional) The increments of line height relative to the minimum height that can contain the current font size. It must be an integer. |

It will return an array list containing the calculated `font-size` and `line-height` values.

Example:

```js
const sizes = hms.getSizes(3, 2)
// sizes == ['calc(1rem * 8 / 5)', 'calc(1em * 45 / 32)']

// shorthand signature
const sizes = hms.getSizes([3, 2])
```

**Note:** when `lineHeightDegree` is `undefined` the second element of the returned array will be `undefined`

### `sizes`

The `sizes` function accepts the same arguments as [`getSizes`](#getSizes) and returns an object with `font-size` and `line-height` rules.

This function can be used to set the `style` property of a DOM element or in conjunction with a CSS-in-JS library like [emotion](https://emotion.sh/) or [styled-component](https://www.styled-components.com/).

Input:

```js
const styles = hms.sizes(3, 2)

// styles:
// {
//   fontSize: 'calc(1rem * 8 / 5)',
//   lineHeight: 'calc(1em * 45 / 32)'
// }
//
```

### Setup

While the default settings should fit most scenarios, you can setup a cuostm instance of the module by using the `createScale` factory function:

```js
import { createScale } from '@shiftbrainstd/harmonic-modular-scale'

const customScale = createScale({
  // configuration properties
})
```

The factory function accepts an object with the following properties

| parameter        | type    | default   | description                                                 |
| ---------------- | ------- | --------- | ----------------------------------------------------------- |
| `scaleFactor`    | number  | 8         | the scale factor                                            |
| `baseFontSize`   | string  | '1rem'    | base font size (used as the `0` scale value)                |
| `lineHeightUnit` | string  | '0.25rem' | the base increment value at which line-height is calculated |
| `useCalc`        | boolean | true      | if `true` returns a CSS calc expression                     |

Example:

```js
const customScale = createScale({
  useCalc: false, // output rem values
  baseFontSize: '1.25rem', // set 20px as the base font-size
})
```

### Integration with `polyrhythm-typography`

You can use the `getSizes` function as the [`polyrhythm-typography`](https://github.com/ShiftbrainStd/polyrhythm-typography)’s type scaler:

```js
import hms from '@shiftbrainstd/harmonic-modular-scale'
import { createTypography } from '@shiftbrainstd/polyrhythm-typography'

const textstyle = createTypography({
  typeScaler: hms.getSizes,
})
```
