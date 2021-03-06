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
  -call the super class constructor
  -define variables and arrays
  -create the characters
  -create the prompts (navigation, dialogue)
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
    };
    // refer to the letter
    this.letter = {
      img: letterImg,
      x1: 515,
      y1: 490,
      x2: 560,
      y2: 520,
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
      color: this.color2,
    };
    // refer to the main prompt object
    this.mainPrompt = {
      string: `vous ??tes dans la cour de la prison`,
      x: 295,
      y: 670,
      size: 16,
      displayed: false,
      delay: 3000,
    };
    // create the main prompt typewriter
    this.typeMain = new Typewriter(
      this.mainPrompt.string,
      this.mainPrompt.x,
      this.mainPrompt.y,
      this.typewriter.width,
      this.typewriter.height,
      this.typewriter.speed,
      this.mainPrompt.size,
      this.typewriter.color
    );
    // start writting the main prompt after a short delay
    setTimeout(() => {
      this.mainPrompt.displayed = true;
    }, this.mainPrompt.delay);

    // refer to the navigation prompt
    this.navigationPrompt = {
      string: `tape sur X pour retourner ?? la cellule`,
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
      this.navigationPrompt.size,
      this.typewriter.color
    );

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
      this.boulderInteractionPrompt.size,
      this.typewriter.color
    );

    // refer to the boulder interaction prompt
    this.guardianInteractionPrompt = {
      string: `??prenez donc une pioche, ??a va vous occuper.??
tape sur E pour accepter`,
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
      this.guardianInteractionPrompt.size,
      this.typewriter.color
    );

    // refer to the boulder interaction prompt
    this.letterInteractionPrompt = {
      string: `hey, y'avait une lettre en dessous du caillou.
tape sur 'E' pour la lire`,
      x: 295,
      y: 700,
      size: 16,
    };
    // create the main prompt typewriter
    this.letterInteraction = new Typewriter(
      this.letterInteractionPrompt.string,
      this.letterInteractionPrompt.x,
      this.letterInteractionPrompt.y,
      this.typewriter.width,
      this.typewriter.height,
      this.typewriter.speed,
      this.letterInteractionPrompt.size,
      this.typewriter.color
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

    // draw the letter
    this.drawLetter();

    // update the character objects
    this.charactersUpdate();

    // update the npc objects
    this.npcUpdate();

    // draw the ui
    this.ui.update(this.appear.generalAlpha);

    // reset the portrait to the daltons
    this.ui.portrait.img = daltonsPortrait;

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

  // update the npcs
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

  // draw the letter
  drawLetter() {
    if (!recordedData.letterPicked && recordedData.boulderBroken) {
      push();
      noStroke();
      imageMode(CORNERS);
      tint(
        this.color1.r,
        this.color1.g,
        this.color1.b,
        this.appear.generalAlpha
      );
      image(
        this.letter.img,
        this.letter.x1,
        this.letter.y1,
        this.letter.x2,
        this.letter.y2
      );
      pop();
    }
  }

  // draw the boulder
  drawBoulder() {
    if (!recordedData.boulderBroken) {
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
    // draw the guardian interaction prompt
    this.drawGuardianPrompt();
    // draw the letter interaction prompt
    if (!recordedData.letterRead) {
      this.drawLetterPrompt();
    }
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
    let condition = !recordedData.boulderBroken && recordedData.pickaxeObtained;
    if (this.characterAt(x1, x2, condition)) {
      // display the boulder interaction instruction
      this.boulderInteraction.update();
    } else {
      // reset the boulder interaction instruction (erase it)
      this.boulderInteraction.currentCharacter = 0;
    }
  }

  // draw the guradian interaction prompt
  drawGuardianPrompt() {
    // display the boulder interaction instruction
    let x1 = this.guardian.pos.center.x - this.guardian.pos.width / 2;
    let x2 = this.guardian.pos.center.x + this.guardian.pos.width / 2;
    if (this.characterAt(x1, x2, !recordedData.pickaxeObtained)) {
      // if the player doesnt have the pickaxe, display the normal guardian prompt
      this.guardianInteraction.update();
      // change the portrait to the guradian's
      this.ui.portrait.img = guardianPortrait;
    } else if (
      this.characterAt(
        x1,
        x2,
        recordedData.pickaxeObtained && !recordedData.boulderBroken
      )
    ) {
      // if the player has the pickaxe and the boulder is not broken, display secondary prompt
      this.guardianInteraction.string = `??c'est bon, allez travaillez??`;
      this.guardianInteraction.update();
      // change the portrait to the guradian's
      this.ui.portrait.img = guardianPortrait;
    } else if (
      this.characterAt(
        x1,
        x2,
        recordedData.pickaxeObtained && recordedData.boulderBroken
      )
    ) {
      // if the player has the pickaxe and the boulder is broken, display third prompt
      this.guardianInteraction.string = `??vous avez fait du bon travail les gars??`;
      this.guardianInteraction.update();
      // change the portrait to the guradian's
      this.ui.portrait.img = guardianPortrait;
    } else {
      // reset the boulder interaction instruction (erase it)
      this.guardianInteraction.currentCharacter = 0;
    }
  }

  // draw the letter interaction prompt
  drawLetterPrompt() {
    // display the letter interaction instruction
    let x1 = this.letter.x1;
    let x2 = this.letter.x2;
    let x3 = this.letter.x1 - 100;
    let x4 = this.letter.x2 + 100;
    if (
      this.characterAt(
        x3,
        x4,
        !recordedData.letterPicked && recordedData.boulderBroken
      )
    ) {
      // if the boulder is broken and the letter is still on the grond
      this.letterInteraction.update();
    } else if (recordedData.letterPicked) {
      this.letterInteraction.update();
    } else {
      // reset the letter interaction instruction (erase it)
      this.letterInteraction.currentCharacter = 0;
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

  // choose the day of Ma's visit
  visitDate() {
    let inTwoDays;
    if (recordedData.day === 30) {
      inTwoDays = 1;
    } else if (recordedData.day === 31) {
      inTwoDays = 2;
    } else {
      inTwoDays = recordedData.day + 2;
    }
    recordedData.visit.day = inTwoDays;
    return inTwoDays;
  }

  // choose the month of Ma's visit
  visitMonth() {
    let inTwoDays;
    if (recordedData.day === 30) {
      inTwoDays = `avril`;
    } else if (recordedData.day === 31) {
      inTwoDays = `avril`;
    } else {
      inTwoDays = `mai`;
    }
    recordedData.visit.month = inTwoDays;
    return inTwoDays;
  }

  /*
  - takes care of the navigation between states (scenes)
    - save the time and date in local web storage when navigating between scenes
  -takes care of the interaction with npc and other objects
  */
  keyPressed() {
    // call the super class method
    super.keyPressed();

    //  takes care of the navigation between states
    this.stateNavigation();

    // interactions linked to the guardian
    this.guardianInteractions();

    // interactions linked to the letter
    this.letterInteractions();

    // interactions linked to the boulder
    this.boulderInteractions();
  }

  // takes care of the navigation between states
  stateNavigation() {
    // state navigation
    if (this.joe.pos.center.x < 0) {
      if (key === `x`) {
        // play the interaction bip
        super.interactionBip();
        // go to the cell scene
        state = new CellState();

        // save he fact that the letter ahs been read
        recordedData.letterRead = true;
        // save the time and date
        localStorage.setItem(
          `time-date-dalton-data`,
          JSON.stringify(recordedData)
        );
      }
    }
  }

  // interactions linked to the guardian
  guardianInteractions() {
    // guardian interaction
    let x1 = this.guardian.pos.center.x - this.guardian.pos.width / 2;
    let x2 = this.guardian.pos.center.x + this.guardian.pos.width / 2;
    let condition = !recordedData.pickaxeObtained;
    // if you dont have a pickaxe
    if (this.characterAt(x1, x2, condition)) {
      if (key === `e`) {
        // play the interaction bip
        super.interactionBip();
        // keep track of the user getting the pickaxe
        recordedData.pickaxeObtained = true;
      }
    }
  }
  // interactions linked to the boulder
  boulderInteractions() {
    // boulder interaction
    let x3 = this.boulder.p5.x;
    let x4 = this.boulder.p4.x;
    let condition1 =
      !recordedData.boulderBroken && recordedData.pickaxeObtained;
    // if the boulder hasn't been broken yet and ou have a pickaxe
    if (this.characterAt(x3, x4, condition1)) {
      if (key === `e`) {
        // play the interaction bip
        super.interactionBip();
        // kee track of the bouler being brokem
        recordedData.boulderBroken = true;
      }
    }
  }

  // interactions linked to the letter
  letterInteractions() {
    // letter interaction
    let x1 = this.letter.x1 - 100;
    let x2 = this.letter.x2 + 100;
    let condition = recordedData.boulderBroken && !recordedData.letterPicked;
    // if the boulder hasn't been broken yet and the player did not pick the letter yet
    if (this.characterAt(x1, x2, condition)) {
      if (key === `e`) {
        // play the interaction bip
        super.interactionBip();
        // keep track of the user picking the letter
        recordedData.letterPicked = true;
        // display the letter message
        this.letterInteraction.string = `??c'est un message de Ma!
elle va venir nous visiter le ${this.visitDate()} ${this.visitMonth()}??`;
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
