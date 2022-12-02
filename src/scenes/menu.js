import Phaser from "phaser";
var menu;

class Menu extends Phaser.Scene {
  constructor() {
    super({ key: "menu" });
  }

  init() {
    //  Inject our CSS
    var element = document.createElement("style");

    document.head.appendChild(element);

    var sheet = element.sheet;

    var styles =
      '@font-face { font-family: "troika"; src: url("../src/assets/fonts/ttf/troika.otf") format("opentype"); }\n';

    sheet.insertRule(styles, 0);

    styles =
      '@font-face { font-family: "Caroni"; src: url("../src/assets/fonts/ttf/caroni.otf") format("opentype"); }';

    sheet.insertRule(styles, 0);
  }

  preload() {
    // Assets
    this.load.image(
      "nextPage",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png"
    );
    // Audio
    this.load.audio("theme", "../src/assets/audio/mainmenu/theme.mp3"); // Background for Main Menu
    this.load.audio("rain", "../src/assets/audio/sfx/rainAmbience.wav"); // Background for Main Menu
    // this.load.image("menu_single");
    this.load.spritesheet("menu", "../src/assets/animations/mainmenu.png", {
      frameWidth: 960,
      frameHeight: 675,
    });
  }

  create() {
    var add = this.add;
    var input = this.input;

    menu = add.sprite(0, 0, "menu");
    menu.setOrigin(0, 0).setDepth(0);
    menu.setPipeline("Light2D");

    // var rt = this.add.renderTexture(0, 0, 800, 600).setPipeline("Light2D");
    var light = this.lights.addLight(400, 300, 200).setIntensity(2);
    this.lights.enable().setAmbientColor(0x555555);

    input.on("pointermove", function (pointer) {
      light.x = pointer.x;
      light.y = pointer.y;
    });

    this.bg = this.anims.create({
      key: "menu_anim",
      frames: this.anims.generateFrameNumbers("menu"),
      frameRate: 20,
      repeat: -1,
    });

    menu.play("menu_anim");
    var music = this.sound.add("theme");
    music.loop = music.play();

    var rain = this.sound.add("rain", {
      volume: 0.1,
    });
    rain.play();

    createTextBox(this, 500, 120, {
      wrapWidth: 300,
    }).start(content, 360);

    var buttons = this.rexUI.add
      .buttons({
        x: 670,
        y: 520,
        orientation: "y",
        // background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_DARK),
        buttons: [
          createButton(this, "Start").setOrigin(0.5, 1),
          createButton(this, "Credits").setOrigin(0.5, 1),
        ],

        space: {
          left: 14,
          right: 14,
          top: 10,
          bottom: 10,
          item: 28,
        },
      })
      .setOrigin(0.5, 1)
      .layout();

    buttons.getElement("buttons").forEach(function (button) {
      button.popUp(1000, undefined, "Back");
    });

    buttons.on(
      "button.click",
      function (button, index, pointer, event) {
        button.scaleYoyo(300, 1.3); // Start next scene
        music.stop();
        this.scene.start("intro");
      },
      this
    );
  }

  update() {}
}

const COLOR_LIGHT = 0x000b18;
const COLOR_DARK = 0xffffff;

var content = `Just Another Day.`;

const GetValue = Phaser.Utils.Objects.GetValue;
var createTextBox = function (scene, x, y, config) {
  var wrapWidth = GetValue(config, "wrapWidth", 0);
  var fixedWidth = GetValue(config, "fixedWidth", 0);
  var fixedHeight = GetValue(config, "fixedHeight", 0);
  var textBox = scene.rexUI.add
    .textBox({
      x: x,
      y: y,

      // background: ,

      // icon: ,

      text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
      // text: getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight),

      space: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
        icon: 10,
        text: 10,
      },
    })
    .setOrigin(0)
    .layout();

  textBox
    .setInteractive()
    .on(
      "pointerdown",
      function () {
        if (this.isTyping) {
          this.stop(true); // this.isTyping is no longer true when switched to false
        } else {
          this.typeNextPage();
        }
      },
      textBox
    )
    .on(
      "pageend",
      function () {
        if (this.isLastPage) {
          return; // Here move to another scene
        }
      },
      textBox
    );

  return textBox;
};

var getBuiltInText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
  return scene.add
    .text(0, 0, "", {
      fontSize: "60px",
      wordWrap: {
        width: wrapWidth,
      },
      maxLines: 3,
    })
    .setFixedSize(fixedWidth, fixedHeight);
};

var createButton = function (scene, text) {
  return scene.rexUI.add.label({
    width: 60,
    height: 60,
    background: scene.rexUI.add
      .roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT, 0.15)
      .setStrokeStyle(1, COLOR_DARK, 0.3),
    text: scene.add.text(0, 0, text, {
      fontSize: 18,
    }),
    align: "center",
    space: {
      left: 10,
      right: 10,
    },
  });
};

export default Menu;
