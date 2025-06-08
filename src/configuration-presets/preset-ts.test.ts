import { describe, it, expect } from 'vitest'

import { ts } from './preset-ts'

describe('preset-ts', () => {
  it('should match the snapshot', () => {
    expect(ts).toMatchSnapshot()
  })
})