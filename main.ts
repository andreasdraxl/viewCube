import * as BUI from "@thatopen/ui";
import * as OBC from "@thatopen/components";
import * as CUI from "@thatopen/ui-obc";
import * as THREE from "three";
import { ViewCube } from "./src/viewcube";

BUI.Manager.init();
CUI.Manager.init();

const components = new OBC.Components();
const worlds = components.get(OBC.Worlds);
const world = worlds.create<
  OBC.SimpleScene,
  OBC.SimpleCamera,
  OBC.SimpleRenderer
>();

// Szene erstellen und Hintergrundfarbe setzen
world.scene = new OBC.SimpleScene(components);
(world.scene.three as THREE.Scene).background = new THREE.Color(0xaaaaaa);

const viewport = document.createElement("bim-viewport");
world.renderer = new OBC.SimpleRenderer(components, viewport);

world.camera = new OBC.SimpleCamera(components);

// **Ersetzen von bim-view-cube durch den eigenen ViewCube**
const viewCube = new ViewCube();
viewport.append(viewCube.domElement); // Hier wird dein eigener ViewCube ins DOM gehängt

// ViewCube mit der Kamera synchronisieren
world.camera.controls.addEventListener("update", () => {
  viewCube.updateOrientation(world.camera.three.quaternion);
});


const app = document.getElementById("app") as BUI.Grid;
app.layouts = {
  main: {
    template: `
      "viewport"
    `,
    elements: { viewport },
  },
};

const grids = components.get(OBC.Grids);
grids.create(world);

components.init();
