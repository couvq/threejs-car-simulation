import {
  DoubleSide,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  Scene,
} from "three";
import { X_BOUNDARY, Y_BOUNDARY } from "../constants";

/**
 * Creates a plane which serves the purpose of
 * being a surface for our car to drive upon
 */
export interface Plane {
  /**
   * Draws a plane along the x, z axis
   */
  drawPlane(scene: Scene): void;
}

export class PlaneImpl implements Plane {
  constructor() {}

  drawPlane(scene: Scene): void {
    const geometry = new PlaneGeometry(X_BOUNDARY * 2, Y_BOUNDARY * 2);
    const material = new MeshStandardMaterial({
      color: 0x32cd32,
      side: DoubleSide,
    });
    const plane = new Mesh(geometry, material);
    plane.rotateX((Math.PI / 180) * 90);
    scene.add(plane);
  }
}
