import { describe, it, expect } from 'vitest'

import { tsx } from './preset-tsx'

describe('preset-tsx', () => {
  it('should match the snapshot', () => {
    expect(tsx).toMatchSnapshot()
  })
})