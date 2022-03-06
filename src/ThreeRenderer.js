// @ts-check

'use strict'

import * as THREE from 'three'
import { Renderer } from '@fightron/3d/src/Renderer.js'

export class ThreeRenderer extends Renderer {
  /**
   * @param {HTMLCanvasElement} canvas
   */
  constructor (canvas) {
    if (!canvas) {
      throw new Error('ThreeRenderer: canvas element is required')
    }

    super()
    this.canvas = canvas
    this.container = canvas.parentElement
  }

  /**
   * Sets or removes the parent of a THREE object.
   *
   * @param {THREE.Object3D} renderable
   * @param {?THREE.Object3D} [parentRenderable ]
   * @returns {boolean}
   */
  setParent (renderable, parentRenderable = null) {
    renderable.parent = parentRenderable

    return true
  }

  /**
   * Sets the renderable of a skeleton to a THREE Skeleton
   * with bones based on the skeleton's definition.
   *
   * @param {Skeleton} skeleton
   */
  setSkeletonRenderable (skeleton) {
    /** @type {Array<THREE.Bone>} */
    var bones = []

    /** @type {THREE.Bone} */
    var bone

    /** @type {Joint} */
    var parentJoint

    /** @type {IterableIterator<Joint>} */
    var joints = skeleton.joints.values() // TODO: optimize

    for (var joint of joints) {
      this.setJointRenderable(joint)
      bone = joint.renderable

      parentJoint = joint.parent

      if (parentJoint) {
        // For this to work, parent joints must be defined
        // before its children in the skeleton definition.
        this.setParent(bone, joint.parent.renderable)
      }

      bones.push(bone)
    }

    var skeleton3 = new THREE.Skeleton(bones)
    skeleton.renderable = skeleton3

    return true
  }

  /**
   * Sets Joint#renderable with a THREE.Bone based on the joint definition.
   *
   * @param {Joint} joint
   */
  setJointRenderable (joint) {
    var bone = new THREE.Bone()
    var position = bone.position
    var definition = joint.definition

    position.x = definition.positionX
    position.y = definition.positionY
    position.z = definition.positionZ

    joint.renderable = bone

    return true
  }
}

/**
 * @typedef { import('@fightron/3d/src/Skeleton').Skeleton } Skeleton
 * @typedef { import('@fightron/3d/src/Joint').Joint } Joint
 */
