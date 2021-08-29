// @ts-check

'use strict'

import { expect } from '@dimensionalpocket/development'

import SkeletonThreeBuilder from '../index.js'
import { SkeletonThreeBuilder as SkeletonThreeBuilderFromSrc } from '../src/SkeletonThreeBuilder.js'

describe('main require', function () {
  it('exports SkeletonThreeBuilder from src', function () {
    expect(SkeletonThreeBuilder).to.equal(SkeletonThreeBuilderFromSrc)
  })
})
