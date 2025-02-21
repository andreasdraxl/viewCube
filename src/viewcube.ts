import * as THREE from "three";

export class ViewCube {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  public domElement: HTMLCanvasElement;
  private cube: THREE.Mesh;

  constructor() {
    // **Neue Szene für den ViewCube**
    this.scene = new THREE.Scene();

    // **Eigene Kamera für den ViewCube**
    this.camera = new THREE.PerspectiveCamera(50, 1, 0.1, 10);
    this.camera.position.set(2, 2, 2);
    this.camera.lookAt(0, 0, 0);

    // **Renderer**
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(100, 100);
    this.domElement = this.renderer.domElement; // Damit wir das Canvas ins DOM einfügen können

    // **Würfel erstellen**
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    // **Rendering starten**
    this.animate();
  }

  // **Loop für kontinuierliches Rendering**
  private animate = () => {
    requestAnimationFrame(this.animate);
    this.render();
  };

  // **Methode zum Synchronisieren mit der Hauptkamera**
  public updateOrientation(quaternion: THREE.Quaternion) {
    this.camera.quaternion.copy(quaternion);
  }

  private render() {
    this.renderer.render(this.scene, this.camera);
  }
}
