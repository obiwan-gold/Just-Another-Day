import Phaser from "phaser";
import TextPlayer from "phaser3-rex-plugins/plugins/textplayer";

var player;

class Room extends Phaser.Scene {
  constructor() {
    super({ key: "room" });
  }

  preload() {
    this.load.image("bg", "../src/assets/pics/intro_background.png");
    this.load.audio("rain", "../src/assets/audio/sfx/rainAmbience.wav"); // Background for Main Menu
    this.load.audio("tv_render", "../src/assets/audio/sfx/tv_static.mp3");
    this.load.spritesheet("idle", "../src/assets/animations/idle.png", {
      frameWidth: 100,
      frameHeight: 100,
    });
  }

  create() {
    var add = this.add;
    var input = this.input;
    player = add.sprite(450, 300, "idle").setDepth(100);

    var bg = add.image(450, 300, "bg").setDepth(1);
    var rain = this.sound.add("rain", {
      volume: 0.1,
    });
    rain.loop = true;
    rain.play();

    var tv = this.sound.add("tv_render", {
      volume: 0.01,
    });
    tv.loop = true;
    tv.play();

    // this.add.text(450, 300, "something");
    // var bounds = new Phaser.Rectangle(100, 100, 400, 400).setDepth(4);

    // this.anims.create({
    //   key: "idle",
    //   frameRate: 20,
    //   repeat: -1,
    //   frames: this.anims.generateFrameNumbers("idle", { start: 1, end: 8 }),
    // });
    // player.anims.play("idle");
  }

  update() {}
}

export default Room;
