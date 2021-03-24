import Phaser from "phaser";

class ResultsScene extends Phaser.Scene {
  constructor() {
    super({ key: "resultsScene" });
    console.log("resultsScene");
  }

  init(data) {
    this.totalScore = data.score;
  }

  preload() {
    this.load.image("background", "../assets/menu.jpg");
  }

  create() {

    let rankTitle = this.getTitle(this.totalScore);

    //setting copy for us
    const instructCopy1 = "You helped " + this.totalScore/200 + " babies reach the goal in 5 minutes!";
    const instructCopy2 = "This earns you the rank of...";
    const instructCopy3 = rankTitle;
    const instructCopy4 = "We hope you've learned more about how to keep your little ones";
    const instructCopy5 = "safe around the home. To learn more about fall prevention,";
    const instructCopy6 = "take a look at the Resources tab or play another round!";
    const instructCopy7 = "Click below to return to the title screen.";

    //setting background
    let bg = this.add.sprite(0, 0, "background");
    bg.setOrigin(400, 300);

    //title
    let title = this.add.text(100, 100, "Your Results!");

    //instructions
    let copy1 = this.add.text(100, 150, `${instructCopy1}`);
    let copy2 = this.add.text(100, 180, `${instructCopy2}`);
    let copy3 = this.add.text(100, 240, `${instructCopy3}`);
    let copy4 = this.add.text(100, 300, `${instructCopy4}`);
    let copy5 = this.add.text(100, 330, `${instructCopy5}`);
    let copy6 = this.add.text(100, 360, `${instructCopy6}`);
    let copy7 = this.add.text(100, 420, `${instructCopy7}`);

    let backBtn = this.add.text(100, 480, "Back");

    //button resources
    backBtn.setInteractive({ useHandCursor: true });
    backBtn.on("pointerdown", () => this.goBack());
  }

  // button method
  goBack() {
    this.scene.switch("titleScene");
  }

  getTitle(score) {
    if(score < 1000) {
      return "Novice Inspector"
    }
    if(score < 2000) {
      return "Adept Inspector"
    }
    if(score < 3000) {
      return "Magnus Inspector"
    }
    if(score < 4000) {
      return "Grandmaster Inspector"
    }
    if(score < 5000) {
      return "Legendary Inspector"
    }
    return "Visionary Inspector"
  }
}

export default ResultsScene;