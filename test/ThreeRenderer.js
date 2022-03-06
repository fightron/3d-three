// @ts-check

'use strict'

import { expect, sinon } from '@dimensionalpocket/development'

import * as THREE from 'three'

import { JointDefinition } from '@fightron/3d/src/JointDefinition.js'
import { Skeleton } from '@fightron/3d/src/Skeleton.js'
import { SkeletonDefinition } from '@fightron/3d/src/SkeletonDefinition.js'
import { ThreeRenderer } from '../src/ThreeRenderer.js'
import { JSDOM } from 'jsdom'

const dom = new JSDOM('<html><body><div id="container"><canvas id="canvasElement" width="200" height="200"></canvas></div></body></html>')

const canvas = dom.window._document.getElementById('canvasElement')

describe('ThreeRenderer', function () {
  before(function () {
    this.renderer = new ThreeRenderer(canvas)
  })

  describe('constructor', function () {
    it('raises an error if a canvas is not provided', function () {
      expect(() => { return new ThreeRenderer(null) }).to.throw(/canvas element is required/)
    })
  })

  describe('#setSkeletonRenderable', function () {
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
      this.renderer.setSkeletonRenderable(this.skeleton)
    })

    it('sets the skeleton renderable to a THREE.Skeleton', function () {
      expect(this.skeleton.renderable).to.be.an.instanceOf(THREE.Skeleton)
    })

    it('sets the bone hierarchy', function () {
      var bones = this.skeleton.renderable.bones
      expect(bones[1].parent).to.eq(bones[0])
    })

    it('sets bone positions', function () {
      var bones = this.skeleton.renderable.bones
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
})
