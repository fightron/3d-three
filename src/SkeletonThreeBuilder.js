// @ts-check

'use strict'

import THREE from 'three'

export class SkeletonThreeBuilder {
  /**
   *
   * @param {Skeleton} skeleton
   */
  static run (skeleton) {
    var skeleton3 = new THREE.Skeleton(this.buildBones(skeleton))
    skeleton.renderable = skeleton3

    return skeleton3
  }

  /**
   *
   * @param {Skeleton} skeleton
   * @return {Array<THREE.Bone>}
   */
  static buildBones (skeleton) {
    var bones = []
    var joints = skeleton.joints.values()
    var bone

    for (var joint of joints) {
      bone = this.buildBone(skeleton, joint)
      bones.push(bone)
    }

    return bones
  }

  /**
   * Builds a THREE.Bone from a Joint, sets the bone
   * as the joint's renderable, and returns the bone.
   * @param {Skeleton} skeleton
   * @param {Joint} joint
   * @return {THREE.Bone}
   */
  static buildBone (skeleton, joint) {
    var bone = new THREE.Bone()
    var position = bone.position
    var definition = joint.definition

    position.x = definition.positionX
    position.y = definition.positionY
    position.z = definition.positionZ

    joint.renderable = bone

    this.setBoneParent(joint, skeleton)

    return bone
  }

  /**
   * Sets the parent of a THREE Bone in a joint.
   * This requires the renderables to be set in both parent and child joints.
   * @param {Joint} joint
   * @param {Skeleton} skeleton - Used to find the parent joint.
   * @return {boolean} - Returns `true` if a parent was set.
   */
  static setBoneParent (joint, skeleton) {
    var parentName = joint.definition.parent
    if (!parentName) return false

    var parentJoint = skeleton.joints.get(parentName)

    if (!parentJoint) {
      console.warn(`SkeletonThreeBuilder.setBoneParent: parent joint [${parentName}] not found`)
      return false
    }

    /** @type {THREE.Bone} */
    var bone = joint.renderable

    if (!bone) {
      console.warn(`SkeletonThreeBuilder.setBoneParent: joint [${joint.definition.name}] does not have a renderable`)
      return false
    }

    /** @type {THREE.Bone} */
    var parentBone = parentJoint.renderable

    if (!parentBone) {
      console.warn(`SkeletonThreeBuilder.setBoneParent: parent joint [${parentName}] does not have a renderable`)
      return false
    }

    bone.parent = parentBone

    return true
  }
}

/**
 * @typedef { import('@fightron/skeleton/src/Skeleton').Skeleton } Skeleton
 * @typedef { import('@fightron/skeleton/src/Joint').Joint } Joint
 * @typedef { import('@fightron/skeleton/src/JointDefinition').JointDefinition } JointDefinition
 */
