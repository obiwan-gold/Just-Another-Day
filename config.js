import Menu from "./src/scenes/menu";
import Intro from "./src/scenes/intro";
import Room from "./src/scenes/room";
import Credits from "./src/scenes/credits";
import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";

var config = {
  type: Phaser.AUTO,
  width: 900,
  height: 600,
  transparent: true,
  parent: "app",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 300 },
      debug: true,
    },
  },
  canvasStyle: `  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;`,
  plugins: {
    scene: [
      {
        key: "rexUI",
        plugin: UIPlugin,
        mapping: "rexUI",
      },
      // ...
    ],
  },
  render: {
    antialiasGL: false,
    pixelArt: true,
  },
  audio: {
    disableWebAudio: false,
  },
  dom: {
    createContainer: true,
  },
  scene: [Menu, Intro, Room, Credits],
};

export { config };
