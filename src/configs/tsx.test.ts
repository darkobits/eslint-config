import { describe, it, expect } from 'vitest'

import { tsx } from './tsx'

describe('preset-tsx', () => {
  it('should match the snapshot', () => {
    expect(tsx).toMatchSnapshot()
  })
})