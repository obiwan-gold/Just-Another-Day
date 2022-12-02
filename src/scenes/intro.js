import Phaser from "phaser";
var awake;
var bg;

class Intro extends Phaser.Scene {
  constructor() {
    super({ key: "intro" });
  }

  preload() {
    // Animation Intro cutscene
    this.load.audio("whispers", "../src/assets/audio/sfx/whispers.mp3"); // Background for Main Menu
    this.load.audio("tv_render", "../src/assets/audio/sfx/tv_static.mp3");
    this.load.audio("dialogue", "../src/assets/audio/sfx/dialogue_short.mp3");
    this.load.audio("dialogue_med", "../src/assets/audio/sfx/dialogue_med.mp3");
    this.load.spritesheet("awake", "../src/assets/animations/eye_opening.png", {
      frameWidth: 600,
      frameHeight: 338,
    });
    this.load.spritesheet("bedroom", "../src/assets/animations/bedroom.png", {
      // this.load.image("bedroom", "../src/assets/pics/bedroom.jpg");
      frameWidth: 1200,
      frameHeight: 1019,
    });

    // BG assets for game
    this.load.image("player", "../src/assets/pics/brunette_frame.png");

    this.load.image(
      "nextPage",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png"
    );
  }

  create() {
    var add = this.add;
    var input = this.input;

    // this.time.delayedCall(3000, () => {
    this.cameras.main.fadeIn(6000);
    var whispers = this.sound.add("whispers", { volume: 0.9 });
    whispers.play();

    this.intro = this.anims.create({
      key: "awake_anim",
      frames: this.anims.generateFrameNumbers("awake"),
      frameRate: 10,
      repeat: 0,
    });

    // var text = this.add.text(300, 300, "SOmething");

    awake = add.sprite(450, 300, "awake").setOrigin(0.5, 0.5).setScale(1.42);
    awake.play("awake_anim");

    awake.on("animationcomplete", () => {
      whispers.stop();

      this.events.once("awake_dialog", this.handler, this);
      this.events.emit("awake_dialog");
    });
  }

  handler() {
    var dialogue = this.sound.add("dialogue", { volume: 0.9 });
    bg = this.add
      .sprite(450, 300, "bedroom")
      .setScale(0.75)
      .setOrigin(0.5, 0.5);
    this.bg = this.anims.create({
      key: "bg_anim",
      frames: this.anims.generateFrameNumbers("bedroom"),
      frameRate: 12,
      repeat: -1,
    });
    bg.play("bg_anim");

    var tv = this.sound.add("tv_render", { volume: 0.03 });
    tv.loop = true;
    tv.play();
    this.time.delayedCall(700, () => {
      createTextBox(
        this,
        130,
        450,
        {
          wrapWidth: 500,
        },
        dialogue
      ).start(content, 93);
      var Amy = this.add.image(472, 164, "player").setOrigin(0, 0);
    });
    // this.scene.start("room");
  }

  update() {}
}

const COLOR_LIGHT = 0x000000;
const COLOR_DARK = 0xffffff;

var content = `...\f\n What was that. . . \f\n My head . . .`;

const GetValue = Phaser.Utils.Objects.GetValue;
var createTextBox = function (scene, x, y, config, dialogue) {
  var wrapWidth = GetValue(config, "wrapWidth", 0);
  var fixedWidth = 600;
  var fixedHeight = GetValue(config, "fixedHeight", 0);
  var textBox = scene.rexUI.add
    .textBox({
      x: x,
      y: y,

      background: scene.rexUI.add
        .roundRectangle(0, 0, 2, 2, 20, COLOR_DARK)
        .setStrokeStyle(2, COLOR_LIGHT),

      // icon: ,

      text: getBuiltInText(
        scene,
        wrapWidth,
        fixedWidth,
        fixedHeight,
        dialogue
      ).setTint(COLOR_LIGHT),

      action: scene.add
        .image(0, 0, "nextPage")
        .setTint(COLOR_LIGHT)
        .setVisible(false),

      // text: getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight),
      page: {
        maxLines: undefined,
        pageBreak: "\f\n",
      },
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
  // Check if the textbox is typing

  //Checks if the typing is activated ON mouse down
  textBox
    .setInteractive()
    .on(
      "pointerdown",
      function () {
        // Clicking plays the sound
        // Phaser.Input.Keyboard.UpDuration(this.leftClick)
        var icon = this.getElement("action").setVisible(false);
        this.resetChildVisibleState(icon);
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
        var scene = textBox.scene;

        if (this.isLastPage) {
          // scene.add.text(450, 300, "something");
          scene.scene.start("room");
          return; // Here move to another scene
        }
      },
      textBox
    );

  return textBox;
};

var getBuiltInText = function (
  scene,
  wrapWidth,
  fixedWidth,
  fixedHeight,
  dialogue
) {
  return scene.add
    .text(0, 0, "", {
      fontSize: "30px",
      wordWrap: {
        width: wrapWidth,
      },
      maxLines: 3,
    })
    .setFixedSize(fixedWidth, fixedHeight);
};

export default Intro;
