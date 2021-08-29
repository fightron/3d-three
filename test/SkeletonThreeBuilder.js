// @ts-check

'use strict'

import { expect, sinon } from '@dimensionalpocket/development'

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

    it('sets bone positions', function () {
      var bones = this.result.bones
      expect(bones[1].position.x).to.eq(0)
      expect(bones[1].position.y).to.eq(2)
      expect(bones[1].position.z).to.eq(0)
      expect(bones[2].position.x).to.eq(0)
      expect(bones[2].position.y).to.eq(3)
      expect(bones[2].position.z).to.eq(0)
      expect(bones[3].position.x).to.eq(-2)
      expect(bones[3].position.y).to.eq(-2)
      expect(bones[3].position.z).to.eq(0)
      expect(bones[4].position.x).to.eq(2)
      expect(bones[4].position.y).to.eq(-2)
      expect(bones[4].position.z).to.eq(0)
    })
  })

  describe('setRenderableParent', function () {
    before(function () {
      var definition = new SkeletonDefinition({
        name: 'test',
        joints: [
          new JointDefinition({ name: 'root' }),
          new JointDefinition({ name: 'spine', parent: 'root' })
        ]
      })
      this.skeleton = new Skeleton(definition)
      this.rootJoint = this.skeleton.joints.get('root')
      this.spineJoint = this.skeleton.joints.get('spine')
      SkeletonThreeBuilder.run(this.skeleton) // fill renderables
      this.result = SkeletonThreeBuilder.setRenderableParent(this.spineJoint)
    })

    it('returns true', function () {
      expect(this.result).to.eq(true)
    })

    context('when renderable is missing', function () {
      before(function () {
        sinon.stub(console, 'warn')
      })

      after(function () {
        // @ts-ignore
        console.warn.restore()
      })

      context('from joint', function () {
        before(function () {
          this.renderable = this.spineJoint.renderable
          this.spineJoint.renderable = null
          this.result = SkeletonThreeBuilder.setRenderableParent(this.spineJoint)
        })

        after(function () {
          this.spineJoint.renderable = this.renderable
        })

        it('returns false', function () {
          expect(this.result).to.eq(false)
        })

        it('logs a warning', function () {
          expect(console.warn).to.have.been.calledWith('SkeletonThreeBuilder.setRenderableParent: joint [spine] does not have a renderable')
        })
      })

      context('from parent', function () {
        before(function () {
          this.renderable = this.rootJoint.renderable
          this.rootJoint.renderable = null
          this.result = SkeletonThreeBuilder.setRenderableParent(this.spineJoint)
        })

        after(function () {
          this.rootJoint.renderable = this.renderable
        })

        it('returns false', function () {
          expect(this.result).to.eq(false)
        })

        it('logs a warning', function () {
          expect(console.warn).to.have.been.calledWith('SkeletonThreeBuilder.setRenderableParent: parent joint [root] does not have a renderable')
        })
      })
    })
  })
})
