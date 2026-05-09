// eslint-disable-next-line @typescript-eslint/no-explicit-any
let colorThiefPromise: Promise<any> | null = null

export async function loadColorThief() {
  if (!colorThiefPromise) {
    colorThiefPromise = import('colorthief').then((m) => m.default)
  }

  return colorThiefPromise
}
