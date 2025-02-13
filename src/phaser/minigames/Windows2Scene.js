import Phaser from "phaser";
import room from "../../assets/minigames/windows2/background.png";
import chair from "../../assets/minigames/windows2/chair.png";
import eventsCenter from "../EventsCenter"

let counter;
let backButton;
let fontFam = {
    // fontFamily: "cursive",
    fontSize: 45,
    color: "#000000",
    backgroundColor: "#FFFFFF",
};
const fontFamBack = {
    fontSize: 30,
    fontFamily: "Sans-serif",
    color: "#000000",
    fontStyle: "bold",
    backgroundColor: "#FFFFFF",
};
let spawnEvent;
let backBtn;
let titleText;

class windows2Scene extends Phaser.Scene {
    constructor() {
        super("windows2Scene");
        console.log("windows2Scene");
    }

    preload() {
        this.load.image("room", room);
        this.load.image("chair", chair);
    }

    create() {

        counter = 0;

        //add background
        this.add.image(400, 300, "room").setScale(0.55);

        //add minigame title text
        this.add.text(90, 50, "SEPARATE THE FURNITURE FROM THE WINDOW!", { ...fontFam, wordWrap:{width:650} });

        //place chair
        var chair = this.add.image(400, 400, "chair").setScale(0.15);
        chair.setInteractive();
        this.input.setDraggable(chair);

        //place drop zones
        var zone = this.add.zone(650, 400, 150, 250).setRectangleDropZone(150, 250);
        var zone2 = this.add.zone(150, 400, 150, 250).setRectangleDropZone(150, 250);

        /*  Just a visual display of the drop zone
        var graphics = this.add.graphics();
        graphics.lineStyle(2, 0xffff00);
        graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
        */

        //moves dragged object to front
        this.input.on('dragstart', function (pointer, gameObject) {
            this.children.bringToTop(gameObject);
        }, this);

        //moves object
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        //when dragged object touches dropzones
        this.input.on('dragenter', function (pointer, gameObject, dropZone) {
            //graphics.clear();
            //graphics.lineStyle(2, 0x00ffff);
            //graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
        });

        //when dragged object leaves dropzone
        this.input.on('dragleave', function (pointer, gameObject, dropZone) {
            //graphics.clear();
            //graphics.lineStyle(2, 0xffff00);
            //graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
        });

        //when object dropped into dropzone, increment counter
        this.input.on('drop', function (pointer, gameObject, dropZone) {
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;
            gameObject.input.enabled = false;
            counter++;
            //graphics.clear();
            //graphics.lineStyle(2, 0xffff00);
            //graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
        });

        //when drag ends and object is not in the dropzone
        this.input.on('dragend', function (pointer, gameObject, dropped) {
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
            //graphics.clear();
            //graphics.lineStyle(2, 0xffff00);
            //graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
        });
    }

    //increments counter, at 1 it ends games
    update() {
        if (counter >= 1) {
            counter = 0;
            
            let modal = this.add.rectangle(400, 300, 400, 220, 0xffffff);
            modal.setStrokeStyle(10, 0x00bb00);

            titleText = this.add.text(328, 213, "Good Job!", { ...fontFamBack });
            backBtn = this.add.text(282, 330, "", { ...fontFamBack });
            backBtn.setText("Return to game");
            backBtn.setInteractive({ useHandCursor: true });
            backBtn.on("pointerdown", () => this.returnToMini());
        }
    }

    returnToMini() {
        //this.scene.restart("windows2Scene")
        this.scene.stop('windows2Scene')
        this.scene.switch("gameScene")
    }
}

export default windows2Scene;