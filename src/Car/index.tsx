import { BoxGeometry, Mesh, MeshStandardMaterial, Scene, Vector3 } from "three";
import { X_BOUNDARY, Y_BOUNDARY } from "../constants";

export interface Car {
  /**
   * Sets car position in the x direction
   */
  moveCarX(units: number): void;
  /**
   * Sets car position in the z direction
   */
  moveCarZ(units: number): void;
  /**
   * Get car's current position
   */
  getPosition(): Vector3;
}

// todo - move the car when arrow keys are pressed
export class CarImpl implements Car {
  static CAR_WIDTH = 10;
  private car: Mesh;

  constructor(scene: Scene) {
    const geometry = new BoxGeometry(
      CarImpl.CAR_WIDTH,
      CarImpl.CAR_WIDTH,
      CarImpl.CAR_WIDTH
    );
    const material = new MeshStandardMaterial({
      color: 0xffa500,
    });
    const cube = new Mesh(geometry, material);
    this.car = cube;
    cube.position.y += CarImpl.CAR_WIDTH / 2;
    scene.add(cube);
  }
  getPosition(): Vector3 {
    return this.car.position;
  }
  moveCarZ(units: number): void {
    if (units > 0 && this.car.position.z + CarImpl.CAR_WIDTH / 2 === Y_BOUNDARY)
      return;
    if (
      units < 0 &&
      this.car.position.z - CarImpl.CAR_WIDTH / 2 === -Y_BOUNDARY
    )
      return;
    this.car.position.z += units;
  }
  moveCarX(units: number): void {
    if (units > 0 && this.car.position.x + CarImpl.CAR_WIDTH / 2 === X_BOUNDARY)
      return;
    if (
      units < 0 &&
      this.car.position.x - CarImpl.CAR_WIDTH / 2 === -X_BOUNDARY
    )
      return;
    this.car.position.x += units;
  }
}
