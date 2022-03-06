// @ts-check

'use strict'

import { expect } from '@dimensionalpocket/development'

import { ThreeRenderer } from '../index.js'
import { ThreeRenderer as ThreeRendererFromSrc } from '../src/ThreeRenderer.js'

describe('main require', function () {
  it('exports ThreeRenderer from src', function () {
    expect(ThreeRenderer).to.equal(ThreeRendererFromSrc)
  })
})
