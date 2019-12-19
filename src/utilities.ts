export function trunc(num: number): number {
  return num < 0 ? Math.ceil(num) : Math.floor(num)
}

export function getUnit(value: number | string): string {
  if (typeof value === 'number') {
    return 'px'
  }
  const [unit = ''] = value.match(/[^\d]+$/) || []

  return unit
}

export function toNumber(value: string | number): number {
  return typeof value === 'string' ? parseFloat(value) : value
}
