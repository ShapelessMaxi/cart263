/*
Interactions linked to the yard state (game scene) are handled here.
Extension of the State class.

> create the main characters
> display and move the characters
> create and display the ui
> right of screen to navigate to cell scene/state
> npc guard gives you a pickaxe
> with pickaxe, you can mine the boulder and find a note
*/
class YardState extends State {
  /*
  call the super class constructor
  define variables and arrays
  create the characters
  */
  constructor() {
    // call the super class constructor
    super();

    // decide if we should skip having to click to fade out the overlay
    this.skipClick = true;

    // refer to the colors used
    this.color1 = { r: 50, g: 150, b: 255, a: 255 }; // bright blue
    this.color2 = { r: 15, g: 15, b: 15, a: 255 }; // almost black

    // refer to the text on the overlay
    this.overlayText = `la cour de la prison`;
    // create the ui
    this.ui = new Ui(this.color1, this.color2);

    // refer to the floor
    this.floor = {
      x1: 0,
      y1: 450,
      x2: 1000,
      y2: 750,
    };
    // refer to the boulder
    this.boulder = {
      p1: { x: 450, y: 270 },
      p2: { x: 540, y: 240 },
      p3: { x: 690, y: 340 },
      p4: { x: 710, y: 470 },
      p5: { x: 380, y: 470 },
      displayed: true,
    };

    // create the characters
    this.joe = new Leader(this.color1, this.color2);
    this.jack = new Follower(`jack`, this.color1, this.color2);
    this.william = new Follower(`william`, this.color1, this.color2);
    this.averell = new Follower(`averell`, this.color1, this.color2);
    // create the npc guardian
    this.guardian = new Npc(guardianImg, this.color1, this.color2);

    // refer to the typewriter animation object
    this.typewriter = {
      speed: 0.8,
      width: 800,
      height: 100,
    };
    // refer to the main prompt object
    this.mainPrompt = {
      string: `vous êtes dans la cour de la prison`,
      x: 295,
      y: 670,
      size: 16,
      displayed: false,
      delay: 4000,
    };
    // create the main prompt typewriter
    this.typeMain = new Typewriter(
      this.mainPrompt.string,
      this.mainPrompt.x,
      this.mainPrompt.y,
      this.typewriter.width,
      this.typewriter.height,
      this.typewriter.speed,
      this.mainPrompt.size
    );
    // start writting the main prompt after a short delay
    setTimeout(() => {
      this.mainPrompt.displayed = true;
    }, this.mainPrompt.delay);

    // refer to the navigation prompt
    this.navigationPrompt = {
      string: `tape sur X pour retourner à la cellule`,
      x: 295,
      y: 670,
      size: 16,
    };
    // create the main prompt typewriter
    this.typeNavigation = new Typewriter(
      this.navigationPrompt.string,
      this.navigationPrompt.x,
      this.navigationPrompt.y,
      this.typewriter.width,
      this.typewriter.height,
      this.typewriter.speed,
      this.navigationPrompt.size
    );

    // if the boulder hasn't been broken yet
    if (!recordedTime.boulderBroken) {
      // refer to the boulder interaction prompt
      this.boulderInteractionPrompt = {
        string: `tape sur E pour briser le caillou`,
        x: 295,
        y: 715,
        size: 16,
      };
      // create the main prompt typewriter
      this.boulderInteraction = new Typewriter(
        this.boulderInteractionPrompt.string,
        this.boulderInteractionPrompt.x,
        this.boulderInteractionPrompt.y,
        this.typewriter.width,
        this.typewriter.height,
        this.typewriter.speed,
        this.boulderInteractionPrompt.size
      );
    }

    // refer to the boulder interaction prompt
    this.guardianInteractionPrompt = {
      string: `prenez donc une pioche, ça va vous occuper
tape sur 'E' pour accepter`,
      x: 295,
      y: 700,
      size: 16,
    };
    // create the main prompt typewriter
    this.guardianInteraction = new Typewriter(
      this.guardianInteractionPrompt.string,
      this.guardianInteractionPrompt.x,
      this.guardianInteractionPrompt.y,
      this.typewriter.width,
      this.typewriter.height,
      this.typewriter.speed,
      this.guardianInteractionPrompt.size
    );

    // refer to the object taking care of making the things appear
    this.appear = {
      generalAlpha: 0,
      speed: 8,
      animationStarted: false,
      delay: 2000,
    };
    // start making the things appear
    this.startFadeIn();
  }

  /*
  call the super class update method
  draw the floor
  update and constrain the characters
  update the ui
  draw the text prompts in the ui
  fade in the elements when arriving
  */
  update() {
    // call the super class update method
    super.update(this.color1, this.color2, this.skipClick, this.overlayText);

    // draw the floor
    this.drawFloor();
    // draw the boulder
    this.drawBoulder();

    // update the character objects
    this.charactersUpdate();
    // update the npc objects
    this.npcUpdate();

    // draw the ui
    this.ui.update(this.appear.generalAlpha);

    // draw the text prompts in the ui
    this.drawPrompts();

    // make the things appear
    this.fadeIn();
  }

  // update the character objects
  charactersUpdate() {
    this.joe.update(this.appear.generalAlpha);
    this.jack.update(this.appear.generalAlpha, this.joe);
    this.william.update(this.appear.generalAlpha, this.jack);
    this.averell.update(this.appear.generalAlpha, this.william);

    // constrain the character to an area of the screen
    let characterRange = {
      x1: -200,
      x2: width + 200,
      y1: this.floor.y1 + 10,
      y2: height - 45,
    };
    this.joe.screenConstrain(characterRange);
    this.jack.screenConstrain(characterRange);
    this.william.screenConstrain(characterRange);
    this.averell.screenConstrain(characterRange);
  }
  // checks if the leader character is at the boulder
  characterAt(x1, x2, condition) {
    if (this.joe.pos.center.x > x1 && this.joe.pos.center.x < x2 && condition) {
      return true;
    }
  }

  npcUpdate() {
    this.guardian.update(this.appear.generalAlpha);
  }

  // draw the floor
  drawFloor() {
    // draw a rectangle for the floor
    push();
    rectMode(CORNERS);
    noStroke();
    fill(this.color2.r, this.color2.g, this.color2.b, this.appear.generalAlpha);
    rect(this.floor.x1, this.floor.y1, this.floor.x2, this.floor.y2);
    pop();
  }
  // draw the boulder
  drawBoulder() {
    if (!recordedTime.boulderBroken && this.boulder.displayed) {
      push();
      noStroke();
      fill(
        this.color2.r,
        this.color2.g,
        this.color2.b,
        this.appear.generalAlpha
      );
      beginShape();
      vertex(this.boulder.p1.x, this.boulder.p1.y);
      vertex(this.boulder.p2.x, this.boulder.p2.y);
      vertex(this.boulder.p3.x, this.boulder.p3.y);
      vertex(this.boulder.p4.x, this.boulder.p4.y);
      vertex(this.boulder.p5.x, this.boulder.p5.y);
      endShape(CLOSE);
      pop();
    }
  }

  // draw the text prompts in the ui
  drawPrompts() {
    // draw the main location prompt
    this.drawMainPrompt();
    // draw the navigation prompt
    this.drawNavigationPrompt();
    // draw the boulder interaction prompt
    this.drawBoulderPrompt();
    // draw the boulder interaction prompt
    this.drawGuardianPrompt();
  }

  // draw the main location prompt
  drawMainPrompt() {
    // display the main prompt
    if (this.mainPrompt.displayed) {
      this.typeMain.update();
    }
  }
  // draw the navigation prompt
  drawNavigationPrompt() {
    // display the navigation instruction
    if (this.joe.pos.center.x < 0) {
      this.typeNavigation.update();
      // reset the main prompt (erase it)
      this.typeMain.currentCharacter = 0;
    } else {
      // reset the navigation instruction (erase it)
      this.typeNavigation.currentCharacter = 0;
    }
  }
  // draw the boulder interaction prompt
  drawBoulderPrompt() {
    let x1 = this.boulder.p5.x;
    let x2 = this.boulder.p4.x;
    let condition = !recordedTime.boulderBroken && recordedTime.pickaxeObtained;
    if (this.characterAt(x1, x2, condition)) {
      // display the boulder interaction instruction
      this.boulderInteraction.update();
    } else {
      // reset the boulder interaction instruction (erase it)
      this.boulderInteraction.currentCharacter = 0;
    }
  }
  // draw the boulder interaction prompt
  drawGuardianPrompt() {
    // display the boulder interaction instruction
    let x1 = this.guardian.pos.center.x - this.guardian.pos.width / 2;
    let x2 = this.guardian.pos.center.x + this.guardian.pos.width / 2;
    let condition = !recordedTime.pickaxeObtained;
    if (this.characterAt(x1, x2, condition)) {
      this.guardianInteraction.update();
    } else if (this.characterAt(x1, x2, !condition)) {
      this.guardianInteraction.string = `c'est bon, allez travaillez`;
      this.guardianInteraction.update();
    } else {
      // reset the boulder interaction instruction (erase it)
      this.guardianInteraction.currentCharacter = 0;
    }
  }

  // start to make things appear
  startFadeIn() {
    //check if the fade in animation has started
    if (!this.appear.animationStarted) {
      // start the fade in animation of the overlay after 1 seconds
      setTimeout(() => {
        this.appear.animationStarted = true;
      }, this.appear.delay);
    }
  }
  // fade in animation for various elements
  fadeIn() {
    if (this.appear.animationStarted && this.appear.generalAlpha <= 255) {
      this.appear.generalAlpha += this.appear.speed;
    }
  }

  /*
  - takes care of the navigation between states (scenes)
    - save the time and date in local web storage when navigating between scenes
  -takes care of the interaction with npc and other objects
  */
  keyPressed() {
    // call the super class method
    super.keyPressed();

    // state navigation
    if (this.joe.pos.center.x < 0) {
      if (key === `x`) {
        // go to the cell scene
        state = new CellState();

        // save the time and date
        localStorage.setItem(
          `time-date-dalton-data`,
          JSON.stringify(recordedTime)
        );
      }
    }

    // if you dont have a pickaxe
    // guardian interaction
    let x1 = this.guardian.pos.center.x - this.guardian.pos.width / 2;
    let x2 = this.guardian.pos.center.x + this.guardian.pos.width / 2;
    let condition = !recordedTime.pickaxeObtained;
    if (this.characterAt(x1, x2, condition)) {
      if (key === `e`) {
        recordedTime.pickaxeObtained = true;
        this.ui.tools.pickaxe.displayed = true;
      }
    }

    // if the boulder hasn't been broken yet and ou have a pickaxe
    // boulder interaction
    let x3 = this.boulder.p5.x;
    let x4 = this.boulder.p4.x;
    let condition1 =
      !recordedTime.boulderBroken && recordedTime.pickaxeObtained;
    if (this.characterAt(x3, x4, condition1)) {
      if (key === `e`) {
        recordedTime.boulderBroken = true;
        this.boulder.displayed = false;
      }
    }
  }

  /*
  call the super class update mousePressed method
  */
  mousePressed() {
    // call the super class update mousePressed method
    super.mousePressed();
  }
}
