# @fightron/3d-three

[![build](https://github.com/fightron/3d-three/actions/workflows/node.js.yml/badge.svg)](https://github.com/fightron/3d-three/actions/workflows/node.js.yml) [![Total alerts](https://img.shields.io/lgtm/alerts/g/fightron/3d-three.svg)](https://lgtm.com/projects/g/fightron/3d-three/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/fightron/3d-three.svg)](https://lgtm.com/projects/g/fightron/3d-three/context:javascript)

[THREE](https://github.com/mrdoob/three.js) renderer for [@fightron/3d](https://github.com/fightron/3d-js).

## Usage

```javascript
import { Skeleton } from '@fightron/3d'
import { ThreeRenderer } from '@fightron/3d-three'

var skeleton = new Skeleton(/* ... */)

// ThreeRenderer requires a canvas element to render on.
var canvas = document.getElementById(...)
var renderer = new ThreeRenderer(canvas)

// This will build skeleton.renderable,
// which will be a THREE.Skeleton instance
// with a collection of THREE.Bone instances.
renderer.setSkeletonRenderable(skeleton)

// After building the renderable, you can then
// manipulate the joints, and the renderable
// will be updated.
var spine = skeleton.joints.get('spine')
spine.rotationY = 0.4

// With poses:
var pose = new Pose(/* ... */)
pose.apply(skeleton)

// You can also directly manipulate the renderable:
var skeleton3 = skeleton.renderable // THREE.Skeleton
skeleton3.bones[1].rotation.y = 0.4
```
