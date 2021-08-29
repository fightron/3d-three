// @ts-check

'use strict'

import THREE from 'three'

export class SkeletonThreeBuilder {
  /**
   * Sets the renderable of a skeleton to a THREE Skeleton
   * with bones based on the skeleton's definition.
   *
   * @param {Skeleton} skeleton
   */
  static run (skeleton) {
    var skeleton3 = new THREE.Skeleton(this.buildBones(skeleton))
    skeleton.renderable = skeleton3

    return skeleton3
  }

  /**
   * Builds an array of THREE Bones with the correct hierarchy.
   *
   * @param {Skeleton} skeleton
   *
   * @returns {Array<THREE.Bone>}
   */
  static buildBones (skeleton) {
    var bones = []
    var bone

    /** @type {IterableIterator<Joint>} */
    var joints = skeleton.joints.values()

    for (var joint of joints) {
      bone = this.buildBone(joint)
      joint.renderable = bone

      this.setRenderableParent(joint)

      bones.push(bone)
    }

    return bones
  }

  /**
   * Builds a THREE.Bone from a Joint and returns it.
   *
   * @param {Joint} joint
   *
   * @returns {THREE.Bone}
   */
  static buildBone (joint) {
    var bone = new THREE.Bone()
    var position = bone.position
    var definition = joint.definition

    position.x = definition.positionX
    position.y = definition.positionY
    position.z = definition.positionZ

    return bone
  }

  /**
   * Sets the parent of a joint's renderable (a THREE Bone).
   * This requires the renderables to be set in both parent and child joints.
   *
   * @param {Joint} joint
   *
   * @returns {boolean} - Returns `true` if a parent was set.
   */
  static setRenderableParent (joint) {
    var parentJoint = joint.parent

    if (!parentJoint) {
      return false
    }

    /** @type {THREE.Bone} */
    var renderable = joint.renderable

    if (!renderable) {
      console.warn(`SkeletonThreeBuilder.setRenderableParent: joint [${joint.definition.name}] does not have a renderable`)
      return false
    }

    /** @type {THREE.Bone} */
    var parentRenderable = parentJoint.renderable

    if (!parentRenderable) {
      console.warn(`SkeletonThreeBuilder.setRenderableParent: parent joint [${parentJoint.definition.name}] does not have a renderable`)
      return false
    }

    renderable.parent = parentRenderable

    return true
  }
}

/**
 * @typedef { import('@fightron/skeleton/src/Skeleton').Skeleton } Skeleton
 * @typedef { import('@fightron/skeleton/src/Joint').Joint } Joint
 * @typedef { import('@fightron/skeleton/src/JointDefinition').JointDefinition } JointDefinition
 */
