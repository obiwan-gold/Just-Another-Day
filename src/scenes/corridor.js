import Phaser from "phaser";

class Corridor extends Phaser.Scene {
  constructor() {
    super({ key: "corridor" });
  }

  preload() {
    // Find assets
  }

  create() {
    var add = this.add;
    var input = this.input;

    var ground = this.add.image(450, 600, "ground");

    var items = this.add.group();
    this.physics.add.collider(player, ground);
    this.physics.add.overlap(player, items, displayCommand, null, this);

    function displayCommand(player, items) {
      // Press command
      var pressSpace = add.text(450, 400, "Press X to pick up");
      item.alpha = 0;

      return;
    }
    keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  handler() {
    var inventory = this.add.image(450, -300, "inventory");
    inventory.alpha = 1;

    if (inventory.alpha === 1) {
      var background = this.rexUI.add.roundRectangle(
        0,
        0,
        0,
        0,
        20,
        COLOR_PRIMARY
      );

      states.addState(name, {
        next: "B", // function() { return 'B'; }
        enter: function () {},
        exit: function () {},
      });
      var btns = {};
      var keys = "0123456789.<",
        key;
      for (var i = 0, cnt = keys.length; i < cnt; i++) {
        key = keys[i];
        btns[key] = createButton(this, key);
      }

      var print = this.add.text(0, 0, "");
      this.rexUI.add
        .gridButtons({
          x: 400,
          y: 300,
          width: 300,
          height: 400,

          background: background,

          buttons: [
            [btns[`${items[0]}`], btns[`${items[1]}`], btns[`${items[2]}`]],
          ],
          space: {
            left: 10,
            right: 10,
            top: 20,
            bottom: 20,
            row: 20,
            column: 10,
          },
        })
        .layout()
        //.drawBounds(this.add.graphics(), 0xff0000)
        .on("button.click", function (button, index, pointer, event) {
          if (key === "<") {
          } else {
          }
          // value to display
        });
    }
  }

  update() {
    if (keySpace.is.Down) this.events.once("inventory", this.handler, this);
    this.events.emit("inventory");
  }
}

export default Corridor;
