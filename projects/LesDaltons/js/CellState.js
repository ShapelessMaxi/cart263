/*
Interactions linked to the cell state (first game scene) are handled here.
Extension of the State class.

> create the main characters
> display and move the characters
> create and display the ui
> bed object gives you the possibility of skipping a day
> left and right of screen to navigate to yard scene/state
> can eat the bread in the cell to find spoon
> if spoon is found, dig hole in the ground to navigate to tunnel state
*/
class CellState extends State {
  /*
  -call the super class constructor
  -define variables and objects
  -create the characters
  -create the prompts (navigation, dialogue)
  -define and start the fade in animation
  */
  constructor() {
    // call the super class constructor
    super();

    // decide if we should skip having to click to fade out the overlay
    this.skipClick = true;
    // refer to the text on the overlay
    this.overlayText = `la cellule des Daltons`;

    // refer to the colors used
    this.color1 = { r: 210, g: 200, b: 0, a: 255 }; // bright yellow
    this.color2 = { r: 15, g: 15, b: 15, a: 255 }; // almost black

    // refer to the floor
    this.floor = {
      x1: 0,
      y1: 450,
      x2: 1000,
      y2: 750,
    };
    // refer to the bed
    this.bed = {
      img: bedImg,
      x1: 450,
      y1: 390,
      x2: 710,
      y2: 480,
    };
    // refer to the tunnel hole
    this.tunnel = {
      x: undefined,
      y: 550,
      width: 120,
      height: 40,
    };
    // create the ui
    this.ui = new Ui(this.color1, this.color2);

    // create the characters
    this.joe = new Leader(this.color1, this.color2);
    this.jack = new Follower(`jack`, this.color1, this.color2);
    this.william = new Follower(`william`, this.color1, this.color2);
    this.averell = new Follower(`averell`, this.color1, this.color2);

    // refer to the typewriter animation
    this.typewriter = {
      speed: 0.8,
      width: 800,
      height: 100,
      color: this.color2,
    };
    // refer to the main navigation prompt
    this.mainPrompt = {
      string: `vous ??tes dans votre cellule`,
      x: 295,
      y: 670,
      size: 16,
      displayed: false,
      delay: 3000,
    };
    // create the main navigation typewriter object
    this.typeMainPrompt = new Typewriter(
      this.mainPrompt.string,
      this.mainPrompt.x,
      this.mainPrompt.y,
      this.typewriter.width,
      this.typewriter.height,
      this.typewriter.speed,
      this.mainPrompt.size,
      this.typewriter.color
    );
    // start writting the main navigation prompt after a short delay
    setTimeout(() => {
      this.mainPrompt.displayed = true;
    }, this.mainPrompt.delay);

    // refer to the yard state navigation prompt
    this.yardNavigationPrompt = {
      string: `tape sur X pour sortir dans la cour`,
      x: 295,
      y: 670,
      size: 16,
    };
    // create the yard state navigation prompt typewriter object
    this.typeYardNavigation = new Typewriter(
      this.yardNavigationPrompt.string,
      this.yardNavigationPrompt.x,
      this.yardNavigationPrompt.y,
      this.typewriter.width,
      this.typewriter.height,
      this.typewriter.speed,
      this.yardNavigationPrompt.size,
      this.typewriter.color
    );

    // refer to the visit state navigation prompt
    this.visitNavigationPrompt = {
      string1: `vous n'avez pas l'acc??s ?? la salle de visite`,
      string2: `tape sur X pour sortir dans la cour`,
      x: 295,
      y: 670,
      size: 16,
    };
    // create the visit state navigation prompt typewriter object
    this.typeVisitNavigation = new Typewriter(
      this.visitNavigationPrompt.string1,
      this.visitNavigationPrompt.x,
      this.visitNavigationPrompt.y,
      this.typewriter.width,
      this.typewriter.height,
      this.typewriter.speed,
      this.visitNavigationPrompt.size,
      this.typewriter.color
    );

    // refer to the bed interaction prompt
    this.bedPrompt = {
      string: `tape sur E pour aller dormir`,
      x: 295,
      y: 715,
      size: 16,
    };
    // create the bed interactio typewriter object
    this.bedInteraction = new Typewriter(
      this.bedPrompt.string,
      this.bedPrompt.x,
      this.bedPrompt.y,
      this.typewriter.width,
      this.typewriter.height,
      this.typewriter.speed,
      this.bedPrompt.size,
      this.typewriter.color
    );

    // refer to the bread interaction prompt
    this.breadPrompt = {
      string: `tape sur E pour manger le pain`,
      x: 295,
      y: 692,
      size: 16,
    };
    // create the bread interaction typewriter object
    this.breadInteraction = new Typewriter(
      this.breadPrompt.string,
      this.breadPrompt.x,
      this.breadPrompt.y,
      this.typewriter.width,
      this.typewriter.height,
      this.typewriter.speed,
      this.breadPrompt.size,
      this.typewriter.color
    );

    // refer to the tunnel interaction prompt
    this.tunnelPrompt = {
      string: `tape sur E pour creuser un tunnel`,
      x: 295,
      y: 692,
      size: 16,
    };
    // create the tunnel interaction typewriter object
    this.tunnelInteraction = new Typewriter(
      this.tunnelPrompt.string,
      this.tunnelPrompt.x,
      this.tunnelPrompt.y,
      this.typewriter.width,
      this.typewriter.height,
      this.typewriter.speed,
      this.tunnelPrompt.size,
      this.typewriter.color
    );

    // refer to fade in animation properties
    this.appear = {
      generalAlpha: 0,
      speed: 8,
      animationStarted: false,
      delay: 2000,
    };
    // start the fade in animation
    this.startFadeIn();
  }

  /*
  -call the super class update method
  -draw the floor, the bed and the tunnel hole
  -update and constrain the characters
  -update the ui
  -draw the prompts (navigation, dialogue)
  -fade in the elements when arriving
  */
  update() {
    // call the super class update method
    super.update(this.color1, this.color2, this.skipClick, this.overlayText);

    // draw the floor
    this.drawFloor();

    // draw the bed
    this.drawBed();
    if (recordedData.holeDug) {
      this.drawTunnelHole();
    }

    // update the character objects
    this.charactersUpdate();

    // draw the ui
    this.ui.update(this.appear.generalAlpha);

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

  // checks if the leader character is in between two x values
  characterAt(x1, x2) {
    if (this.joe.pos.center.x > x1 && this.joe.pos.center.x < x2) {
      return true;
    }
  }

  // draw the floor
  drawFloor() {
    push();
    rectMode(CORNERS);
    noStroke();
    fill(this.color2.r, this.color2.g, this.color2.b, this.appear.generalAlpha);
    rect(this.floor.x1, this.floor.y1, this.floor.x2, this.floor.y2);
    pop();
  }

  // draw the bed
  drawBed() {
    push();
    imageMode(CORNERS);
    noStroke();
    tint(this.color2.r, this.color2.g, this.color2.b, this.appear.generalAlpha);
    image(this.bed.img, this.bed.x1, this.bed.y1, this.bed.x2, this.bed.y2);
    pop();
  }

  // draw the tunnel hole
  drawTunnelHole() {
    push();
    noStroke();
    fill(this.color1.r, this.color1.g, this.color1.b, this.appear.generalAlpha);
    ellipse(
      this.tunnel.x,
      this.tunnel.y,
      this.tunnel.width,
      this.tunnel.height
    );
    pop();
  }

  // draw the text prompts in the ui
  drawPrompts() {
    // display the main location prompt
    this.drawMainPrompt();

    // display the yard navigation instruction
    this.drawYardNavigationPrompt();

    // display the visit room navigation instruction
    this.drawVisitNavigationPrompt();

    // display the bed interaction prompt
    this.drawBedPrompt();

    // display the bread interaction prompt
    this.drawBreadPrompt();

    // draw the tunnel statement prompt
    if (recordedData.breadEaten) {
      this.drawBreadPrompt();
    }

    // draw the tunnel interaction prompt
    this.drawTunnelPrompt();
  }

  // draw the main location prompt
  drawMainPrompt() {
    if (this.mainPrompt.displayed) {
      this.typeMainPrompt.update();
    }
  }

  // draw the yard navigation instruction
  drawYardNavigationPrompt() {
    if (this.joe.pos.center.x > width) {
      this.typeYardNavigation.update();
      // reset the main navigation prompt
      this.typeMainPrompt.currentCharacter = 0;
    } else {
      // reset the yard navigation instruction
      this.typeYardNavigation.currentCharacter = 0;
    }
  }

  // draw the visit room navigation instruction
  drawVisitNavigationPrompt() {
    if (
      this.joe.pos.center.x < 0 &&
      recordedData.day === recordedData.visit.day &&
      recordedData.month === recordedData.visit.month
    ) {
      // on the day of Ma's visit, type secondary prompt
      this.typeVisitNavigation.string = `tape sur 'X' pour aller dans la salle de visite`;
      this.typeVisitNavigation.update();
      // reset the main navigation prompt
      this.typeMainPrompt.currentCharacter = 0;
    } else if (this.joe.pos.center.x < 0) {
      this.typeVisitNavigation.update();
      // reset the main navigation prompt
      this.typeMainPrompt.currentCharacter = 0;
    } else {
      // reset the navigation instruction (erase it)
      this.typeVisitNavigation.currentCharacter = 0;
    }
  }

  // draw the bed interaction prompt
  drawBedPrompt() {
    if (
      this.characterAt(this.bed.x1, this.bed.x2) &&
      recordedData.day === recordedData.visit.day &&
      recordedData.month === recordedData.month &&
      recordedData.breadReceived
    ) {
      // on the day of Ma's visit, after receiving the bread from her, display alternative text
      this.bedInteraction.string = `c'est pas le temps de dormir`;
      // display the bed interaction instruction
      this.bedInteraction.update();
    } else if (
      this.characterAt(this.bed.x1, this.bed.x2) &&
      recordedData.day === recordedData.visit.day &&
      recordedData.month === recordedData.month &&
      !recordedData.breadEaten
    ) {
      //  on the day of Ma's visit, before receiving the bread from her, display alternative text
      this.bedInteraction.string = `vous allez manquer Ma si vous allez dormir`;
      this.bedInteraction.update();
    } else if (this.characterAt(this.bed.x1, this.bed.x2)) {
      // display the bed interaction instruction
      this.bedInteraction.update();
    } else {
      // reset the boulder interaction instruction (erase it)
      this.bedInteraction.currentCharacter = 0;
    }
  }

  // draw the bread interaction prompt
  drawBreadPrompt() {
    if (
      !recordedData.breadEaten &&
      recordedData.breadReceived &&
      !recordedData.ableToDig &&
      this.appear.generalAlpha > 250
    ) {
      // if the player has received the bread, but did not eat it, display normal bread prompt
      this.breadInteraction.update();
    } else {
      // reset the boulder interaction instruction (erase it)
      this.breadInteraction.currentCharacter = 0;
    }
  }

  // draw the tunnel interaction prompt
  drawTunnelPrompt() {
    if (recordedData.ableToDig && !recordedData.holeDug) {
      // if you're able to dig (after finding the spoon), display normal tunnel prompt
      this.tunnelInteraction.update();
    } else if (
      this.characterAt(
        this.tunnel.x - this.tunnel.width / 2,
        this.tunnel.x + this.tunnel.width / 2
      ) &&
      recordedData.holeDug
    ) {
      // if the player has dug a hole, display secondary prompt
      this.tunnelInteraction.string = `Tape sur E pour quitter la prison`;
      this.tunnelInteraction.update();
    } else {
      // reset the tunnel interaction instruction
      this.tunnelInteraction.currentCharacter = 0;
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
  - takes care of the interaction with the bed, the bread and the tunnel
  */
  keyPressed() {
    // call the super class method
    super.keyPressed();

    // navigation between states
    this.navigation();

    // bed interactions
    this.bedInteractions();

    // bread interaction
    this.breadInteractions();

    // tunnel interaction
    this.tunnelInteractions();
  }

  // navigation between states
  navigation() {
    // navigation to the yard
    if (this.joe.pos.center.x > width) {
      if (key === `x`) {
        // play the interaction bip
        super.interactionBip();
        // go to the cell scene
        state = new YardState();
        // save the time and date
        this.saveTime();
      }
    }

    // navigation to the visit room
    if (
      this.joe.pos.center.x < 0 &&
      recordedData.day === recordedData.visit.day &&
      recordedData.month === recordedData.month
    ) {
      // can only go on the day of Ma's visit
      if (key === `x`) {
        // play the interaction bip
        super.interactionBip();
        // keep track of the visit being done
        recordedData.visited = true;
        // go to the cell scene
        state = new VisitRoomState();
        // save the time and date
        this.saveTime();
      }
    }
  }

  // bed interactions
  bedInteractions() {
    if (
      this.characterAt(this.bed.x1, this.bed.x2) &&
      recordedData.day === recordedData.visit.day &&
      recordedData.month === recordedData.visit.month
    ) {
      if (recordedData.breadReceived && recordedData.breadEaten) {
        // do nothing
      }
    } else if (this.characterAt(this.bed.x1, this.bed.x2)) {
      if (key === `e`) {
        // play the interaction bip
        super.interactionBip();
        // reset the cell state
        state = new CellState();
        // skip a day
        recordedData.day++;
        recordedData.hours = 7;
        recordedData.minutes = 0;
        // save the time and date
        this.saveTime();
      }
    }
  }

  // bread interactions
  breadInteractions() {
    if (recordedData.breadReceived && !recordedData.spoonObtained) {
      if (key === `e`) {
        // play the interaction bip
        super.interactionBip();

        // turn the volume of the secondary music up
        let secondaryMusicVolume = 0.1;
        super.changeVolume(secondaryMelody, secondaryMusicVolume);

        // turn the volume of the main music down
        let mainMusicVolume = 0.08;
        super.changeVolume(mainMelody, mainMusicVolume);

        // keep track of the user finding the spoon
        recordedData.spoonObtained = true;

        // change what the bread prompt says
        // timers to chain dialogue
        setTimeout(() => {
          this.breadInteraction.currentCharacter = 0;
          this.breadInteraction.string = `??OUCH! y'avait une cuill??re dans le pain??`;
        }, 300);
        setTimeout(() => {
          this.breadInteraction.currentCharacter = 0;
          this.breadInteraction.string = `??Hey! on pourrais utiliser cette cuill??re
pour creuser un tunnel!??`;
        }, 3500);
        setTimeout(() => {
          recordedData.breadEaten = true;
        }, 7800);
        // start the tunnel interactions
        setTimeout(() => {
          recordedData.ableToDig = true;
        }, 15000);
      }
    }
  }

  // tunnel interactions
  tunnelInteractions() {
    if (recordedData.ableToDig && !recordedData.holeDug) {
      if (key === `e`) {
        // turn the volume of the secondary music up
        let secondaryMusicVolume = 0.2;
        super.changeVolume(secondaryMelody, secondaryMusicVolume);

        // turn the volume of the main music down
        let mainMusicVolume = 0.02;
        super.changeVolume(mainMelody, mainMusicVolume);

        // play the interaction bip
        super.interactionBip();
        // dig a tunnel hole
        recordedData.holeDug = true;
        this.tunnel.x = this.joe.pos.center.x;
      }
    } else if (recordedData.holeDug) {
      if (key === `e`) {
        // play the interaction bip
        super.interactionBip();

        // turn the volume of the secondary music up
        let secondaryMusicVolume = 0.3;
        super.changeVolume(secondaryMelody, secondaryMusicVolume);

        // turn the volume of the main music down
        let mainMusicVolume = 0.01;
        super.changeVolume(mainMelody, mainMusicVolume);

        // change the state
        state = new TunnelState();
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
