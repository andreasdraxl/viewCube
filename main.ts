import * as BUI from "@thatopen/ui";
import * as OBC from "@thatopen/components";
import * as CUI from "@thatopen/ui-obc";
import { Tooltip, Toast, Popover } from "bootstrap";
import { Ripple, initMDB } from "mdb-ui-kit";
initMDB({ Ripple });


// Beispiel: Tooltip für alle `[data-bs-toggle="tooltip"]` aktivieren
document.addEventListener("DOMContentLoaded", () => {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltipTriggerList.forEach((tooltipTriggerEl) => {
    new Tooltip(tooltipTriggerEl);
  });
});


BUI.Manager.init();
CUI.Manager.init();

const components = new OBC.Components();
const worlds = components.get(OBC.Worlds);
const world = worlds.create<
  OBC.SimpleScene,
  OBC.SimpleCamera,
  OBC.SimpleRenderer
>();

world.scene = new OBC.SimpleScene(components);
const viewport = document.createElement("bim-viewport");
world.renderer = new OBC.SimpleRenderer(components, viewport);


world.camera = new OBC.SimpleCamera(components);

world.scene.three.background = null;

const viewCube = document.createElement("bim-view-cube");
viewCube.camera = world.camera.three;
viewport.append(viewCube);

world.camera.controls.addEventListener("update", () =>
  viewCube.updateOrientation(),
);

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