import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import GameScene from "./phaser/GameScene.js";
import TitleScene from "./phaser/TitleScene.js";
import ResourceScene from "./phaser/ResourceScene.js";
import InstructScene from "./phaser/InstructScene.js";
import ResultsScene from "./phaser/ResultsScene.js"
import QuizScene from "./phaser/QuizScene.js";
// import QuizQuestions from "./phaser/QuizQuestions";

import PreloadScene from "./phaser/PreloadScene.js";

// Initializing game scenes
let preloadScene = new PreloadScene();
let gameScene = new GameScene();
let titleScene = new TitleScene();

let resourceScene = new ResourceScene();
let instructScene = new InstructScene();
let resultsScene = new ResultsScene();
let quizScene = new QuizScene();
// let quizQuestions = new QuizQuestions();

//set up phaser config
export const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
};
let game = new Phaser.Game(config);

//load scenes
game.scene.add("preloadScene", preloadScene); //this isn't loading in for some reason, even the constructor doesn't get initiated to console.log
game.scene.add("titleScene", titleScene);
game.scene.add("gameScene", gameScene);

game.scene.add("resourceScene", resourceScene);
game.scene.add("instructScene", instructScene);
game.scene.add("resultsScene", resultsScene)

game.scene.add("quizScene", quizScene);
// game.scene.add("quizQuestions", quizQuestions);

// start the title scene
game.scene.start("preloadScene");
