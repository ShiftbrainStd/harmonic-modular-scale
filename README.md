# harmonic-modular-scale

<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/devjam/harmonic-modular-scale#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/devjam/harmonic-modular-scale/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
</p>

> Harmonic Modular Scale Typography

A Sass module to manage your project’s typographic scale using an harmonic progression.

See the [explanatory article](https://standard.shiftbrain.com/blog/harmonious-proportions-in-type-sizes) for details (Japanese).

<!-- TOC -->

- [Install](#install)
- [Usage](#usage)
  - [`get-sizes` function](#get-sizes)
  - [`get-line-height` function](#get-line-height)
  - [`sizes` mixub](#sizes)
  - [Setup](#setup)
  - [Integration with `polyrhythm-typography`](#integration-with-polyrhythm-typography)
- [Run demo](#run-demo)
- [Run tests](#run-tests)
- [Author](#author)
- [🤝 Contributing](#🤝-contributing)
- [📝 License](#📝-license)

<!-- /TOC -->

## Install

```sh
npm install devjam/harmonic-modular-scale#master -S
```

## Usage

Import the module in your Sass file:

```scss
@use "harmonic-modular-scale" as hms;
```

This module exposes a main function and a mixin:

- `get-sizes`: a function returning a list containing a font-size and an optional line-height.
- `sizes`: a mixin outputting a font-size and line-height. Uses `get-sizes` internally.

### `get-sizes` function

The `get-sizes` function accepts the following arguments:

| argument              | type   | default | description                                                                                                                 |
| --------------------- | ------ | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| `$font-size-degree`   | number | 0       | An integer indicating the font size in the harmonic scale. The returned value will be relative to the base font size.       |
| `$line-height-degree` | number | null    | The increments of line height relative to the minimum height that can contain the current font size. It must be an integer. |

It will return a list containing the calculated `font-size` and `line-height` values.

Example:

```scss
$sizes: hms.get-sizes(3, 2);
// $sizes == (calc(1rem * 8 / 5), calc(1em * 45 / 32))
```

If the first argument passed to the function is a list, its first and second elements will be used as the `$font-size-degree` and `$line-height-degree` argument.

```scss
$list: (3, 2)
$sizes: hms.get-sizes($list);

// equivalent to hms.get-sizes(3, 2);
```

**Note:** when `$line-height-degree` is `null` the returned list will contain only the `font-size` value.

### `get-line-height` function

The `get-line-height` function accepts the following arguments:

| argument              | type   | default | description                                                                                                                 |
| --------------------- | ------ | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| `$font-size-degree`   | number | 0       | An integer indicating the font size in the harmonic scale. The returned value will be relative to the base font size.       |
| `$line-height-degree` | number | null    | The increments of line height relative to the minimum height that can contain the current font size. It must be an integer. |
| `$lines` | number | 1    | The number to multiply the line height for. |

It will returns `line-hieght` value related to the `$base-font-size`. It is helpful when you need to set sizes based on typographic scale.

Input:

```scss
.my-selector {
  margin-top: hms.get-line-height(0, 3, 2);
  margin-bottom: hms.get-line-height(0, 3);
}
```

Output:

```scss
.my-selector {
  margin-top: calc(1rem * 56 / 32 * 2);
  margin-bottom: calc(1rem * 56 / 32);
}
```

### `sizes` mixin

The `sizes` mixin accepts the same arguments as [`get-sizes`](#get-sizes) and outputs `font-size` and `line-height` rules.

Input:

```scss
.my-selector {
  @include hms.sizes(3, 2);
}
```

Output:

```css
.my-selector {
  font-size: calc(1rem * 8 / 5);
  line-height: calc(1em * 45 / 32);
}
```

**Note:** when `$line-height-degree` is `null` the mixin outputs only the `font-size` rule.

### Setup

While the default settings should fit most scenarios, you can customize the module output by setting the following parameters:

| parameter           | type    | default | description                                                 |
| ------------------- | ------- | ------- | ----------------------------------------------------------- |
| `$scale-factor`     | number  | 8       | the scale factor                                            |
| `$base-font-size`   | number  | 1rem    | base font size (used as the `0` scale value)                |
| `$line-height-unit` | number  | 0.25rem | the base increment value at which line-height is calculated |
| `$use-calc`         | boolean | true    | if `true` returns a CSS calc expression                     |

Example:

```scss
@use 'harmonic-modular-scale' as hms with (
  $use-calc: false, // output rem values
  $base-font-size: 1.25rem // set 20px as the base font-size
);
```

### Integration with `polyrhythm-typography`

You can use the `get-sizes` function as the `polyrhythm-typography`’s type scaler:

```scss
// main.scss
@use "sass:meta";
@use "harmonic-modular-scale";

@use "polyrhythm-typography" as pt with (
  $type-scaler: meta.get-function("get-sizes", $module: "harmonic-modular-scale")
);
```

See the `polyrhythm-typography` [documentation](https://github.com/devjam/polyrhythm-typography/#use-a-custom-type-scaler-calculator) for more details.

## Run demo

```sh
npm start
```

## Run tests

```sh
npm run test
```

## Author

👤 **Shiftbrain Inc. (https://www.shiftbrain.com/)**

- Twitter: [@shiftbrain](https://twitter.com/shiftbrain)
- Github: [@devjam](https://github.com/devjam)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/devjam/harmonic-modular-scale/issues).

## 📝 License

Copyright © 2019 [Shiftbrain Inc. (https://www.shiftbrain.com/)](https://github.com/).

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
