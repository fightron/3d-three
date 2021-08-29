// @ts-check

'use strict'

import { expect } from '@dimensionalpocket/development'

import THREE from 'three'

import { JointDefinition } from '@fightron/skeleton/src/JointDefinition.js'
import { Skeleton } from '@fightron/skeleton/src/Skeleton.js'
import { SkeletonDefinition } from '@fightron/skeleton/src/SkeletonDefinition.js'
import { SkeletonThreeBuilder } from '../src/SkeletonThreeBuilder.js'

describe('SkeletonThreeBuilder', function () {
  describe('.run', function () {
    before(function () {
      var definition = new SkeletonDefinition({
        name: 'test',
        joints: [
          new JointDefinition({ name: 'root' }),
          new JointDefinition({ name: 'spine1', parent: 'root', position: { y: 2 } }),
          new JointDefinition({ name: 'spine2', parent: 'spine1', position: { y: 3 } }),
          new JointDefinition({ name: 'leg1', parent: 'root', position: { x: -2, y: -2 } }),
          new JointDefinition({ name: 'leg2', parent: 'root', position: { x: 2, y: -2 } })
        ]
      })
      this.skeleton = new Skeleton(definition)
      this.result = SkeletonThreeBuilder.run(this.skeleton)
    })

    it('returns a THREE.Skeleton', function () {
      expect(this.result).to.be.an.instanceOf(THREE.Skeleton)
    })

    it('sets the bone hierarchy', function () {
      var bones = this.result.bones
      expect(bones[1].parent).to.eq(bones[0])
    })
  })
})
