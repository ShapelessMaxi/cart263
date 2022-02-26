/*
Interactions linked to the visit room state (game scene) are handled here.
Extension of the State class.

> create the main characters
> display and move the characters
> create and display the ui
> Ma npc talks and gives you bread
> right of screen to navigate to cell scene/state
*/
class VisitRoomState extends State {
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
    // refer to the text on the overlay
    this.overlayText = `la salle de visite`;

    // refer to the colors used
    this.color1 = { r: 250, g: 40, b: 80, a: 255 }; // bright pink
    this.color2 = { r: 15, g: 15, b: 15, a: 255 }; // almost black

    // refer to the floor
    this.floor = {
      x1: 0,
      y1: 450,
      x2: 1000,
      y2: 750,
    };
    // create the ui
    this.ui = new Ui(this.color1, this.color2);

    // create the characters
    this.joe = new Leader(this.color1, this.color2);
    this.jack = new Follower(`jack`, this.color1, this.color2);
    this.william = new Follower(`william`, this.color1, this.color2);
    this.averell = new Follower(`averell`, this.color1, this.color2);
    // create the npc guardian
    this.guardian = new Npc(guardianImg, this.color1, this.color2);
    this.guardian.pos.center.x = 248;
    this.ma = new Npc(maImg, this.color1, this.color2);
    this.ma.pos.height = 135;
    this.ma.pos.center.y = 470;
    this.ma.eyes.height = 22;

    // refer to the typewriter animation object
    this.typewriter = {
      speed: 0.8,
      width: 800,
      height: 100,
    };
    // refer to the main prompt object
    this.mainPrompt = {
      string: `vous êtes dans la salle de visite`,
      x: 295,
      y: 670,
      size: 16,
      displayed: false,
      delay: 4000,
    };
    // create the main prompt typewriter
    this.typeMainPrompt = new Typewriter(
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

    // refer to the navigation prompt for going to the visit room
    this.cellNavigationPrompt = {
      string1: `tape sur X pour retourner a la cellule`,
      x: 295,
      y: 670,
      size: 16,
    };
    // create the main prompt typewriter
    this.typeCellNavigation = new Typewriter(
      this.cellNavigationPrompt.string1,
      this.cellNavigationPrompt.x,
      this.cellNavigationPrompt.y,
      this.typewriter.width,
      this.typewriter.height,
      this.typewriter.speed,
      this.cellNavigationPrompt.size
    );

    // refer to the guardian interaction prompt
    this.guardianInteractionPrompt = {
      string: `«bonne visite les gars»`,
      x: 295,
      y: 700,
      size: 16,
    };
    // create the guardian prompt typewriter
    this.guardianInteraction = new Typewriter(
      this.guardianInteractionPrompt.string,
      this.guardianInteractionPrompt.x,
      this.guardianInteractionPrompt.y,
      this.typewriter.width,
      this.typewriter.height,
      this.typewriter.speed,
      this.guardianInteractionPrompt.size
    );

    // refer to the ma interaction prompt
    this.maInteractionPrompt = {
      string: `«mes chéris, j'vous ai  amené un bon pain!»
tape sur E pour accepter`,
      x: 295,
      y: 700,
      size: 16,
    };
    // create the ma prompt typewriter
    this.maInteraction = new Typewriter(
      this.maInteractionPrompt.string,
      this.maInteractionPrompt.x,
      this.maInteractionPrompt.y,
      this.typewriter.width,
      this.typewriter.height,
      this.typewriter.speed,
      this.maInteractionPrompt.size
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
  fade in the elements when arriving
  */
  update() {
    // call the super class update method
    super.update(this.color1, this.color2, this.skipClick, this.overlayText);

    // draw the floor
    this.drawFloor();

    // update the character objects
    this.charactersUpdate();
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

  // update the characters
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
  // update the npcs
  npcUpdate() {
    this.guardian.update(this.appear.generalAlpha);
    this.ma.update(this.appear.generalAlpha);
  }
  // checks if the leader character is at the boulder
  characterAt(x1, x2, condition) {
    if (this.joe.pos.center.x > x1 && this.joe.pos.center.x < x2 && condition) {
      return true;
    }
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

  // draw the text prompts in the ui
  drawPrompts() {
    // display the main location prompt
    this.drawMainPrompt();

    // display the cell navigation instruction
    this.drawCellNavigationPrompt();

    // draw the guardian prompt
    this.drawGuardianPrompt();
    // draw the ma prompt
    this.drawMaPrompt();
  }

  // draw the main location prompt
  drawMainPrompt() {
    if (this.mainPrompt.displayed) {
      this.typeMainPrompt.update();
    }
  }
  // draw the visit room navigation instruction
  drawCellNavigationPrompt() {
    if (this.joe.pos.center.x < 0) {
      this.typeCellNavigation.update();
      // reset the main prompt (erase it)
      this.typeMainPrompt.currentCharacter = 0;
    } else {
      // reset the navigation instruction (erase it)
      this.typeCellNavigation.currentCharacter = 0;
    }
  }
  // draw the guardian prompt
  drawGuardianPrompt() {
    let x1 = this.guardian.pos.center.x - this.guardian.pos.width / 2;
    let x2 = this.guardian.pos.center.x + this.guardian.pos.width / 2;
    let condition = this.joe !== undefined;
    if (this.characterAt(x1, x2, condition)) {
      this.guardianInteraction.update();
      this.ui.portrait.img = guardianPortrait;
    } else {
      // reset the interaction instruction (erase it)
      this.guardianInteraction.currentCharacter = 0;
    }
  }
  // draw the ma prompt
  drawMaPrompt() {
    let x1 = this.ma.pos.center.x - this.ma.pos.width / 2;
    let x2 = this.ma.pos.center.x + this.ma.pos.width / 2;
    let condition = !recordedData.breadReceived;
    if (this.characterAt(x1, x2, condition)) {
      // bread not recceived, draw the normal prompt
      this.maInteraction.update();
      // change the ui portrait for ma's portrait
      this.ui.portrait.img = maPortrait;
    } else if (this.characterAt(x1, x2, !condition)) {
      // bread recceived, draw the secondary prompt
      this.maInteraction.string = `«bon! ben jvous laisse aller manger dans
votre cellule. À bientôt!»`;
      this.maInteraction.update();
      // change the ui portrait for ma's portrait
      this.ui.portrait.img = maPortrait;
    } else {
      // reset the interaction instruction (erase it)
      this.maInteraction.currentCharacter = 0;
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

  // save date and time into local web storage
  saveTime() {
    localStorage.setItem(`time-date-dalton-data`, JSON.stringify(recordedData));
  }

  /*
  - takes care of the navigation between states (scenes)
    - save the time and date in local web storage when navigating between scenes
  */
  keyPressed() {
    // call the super class method
    super.keyPressed();

    // navigation between states
    this.navigation();

    // ma interactions
    this.maInteractions();
  }

  // navigation between states
  navigation() {
    // navigation to the cell
    if (this.joe.pos.center.x < 0) {
      if (key === `x`) {
        // go to the cell scene
        state = new CellState();
        // save the time and date
        this.saveTime();
      }
    }
  }

  // ma interactions
  maInteractions() {
    let x1 = this.ma.pos.center.x - this.ma.pos.width / 2;
    let x2 = this.ma.pos.center.x + this.ma.pos.width / 2;
    let condition = !recordedData.breadReceived;
    if (this.characterAt(x1, x2, condition)) {
      if (key === `e`) {
        // go to the cell scene
        recordedData.breadReceived = true;
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
