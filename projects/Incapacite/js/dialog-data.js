/*
file containing the dialog data
*/


let dialogData = {
  dialog1: {
    question: `What do you think about travelling closer to them?`,
    answer1: `Ok good luck with that.`,
    answer2: `...`,
    button1: {
      text: `yes`,
      click: () => {
        // close the dialog
        $(`#dialog-question`).dialog("close");
        // open the anser dialog
        setTimeout(answerDialog1, 2000, true);
      },
    },
    button2: {
      text: `no`,
      click: () => {
        // close the dialog
        $(`#dialog-question`).dialog("close");
        // open the anser dialog
        setTimeout(answerDialog1, 2000, false);
      },
    },
    button3: {
      text: `okay`,
      click: () => {
        // close the dialog
        $(`#dialog-question`).dialog("close");
        // open the anser dialog
        setTimeout(answerDialog1, 2000, true);
      },
    },
    button4: {
      text: `never`,
      click: () => {
        // close the dialog
        $(`#dialog-question`).dialog("close");
        // open the anser dialog
        setTimeout(answerDialog1, 2000, false);
      },
    },
    button5: {
      text: `for sure`,
      click: () => {
        // close the dialog
        $(`#dialog-question`).dialog("close");
        // open the anser dialog
        setTimeout(answerDialog1, 2000, true);
      },
    },
    button6: {
      text: `maybe`,
      click: () => {
        // close the dialog
        $(`#dialog-question`).dialog("close");
        // open the anser dialog
        setTimeout(answerDialog1, 2000, false);
      },
    },
    button7: {
      text: `non`,
      click: () => {
        // close the dialog
        $(`#dialog-question`).dialog("close");
        // open the anser dialog
        setTimeout(answerDialog1, 2000, false);
      },
    },
    button8: {
      text: `oui`,
      click: () => {
        // close the dialog
        $(`#dialog-question`).dialog("close");
        // open the anser dialog
        setTimeout(answerDialog1, 2000, true);
      },
    },
  },
  dialog2: {
    question: `Do you want to help them?`,
  },
  dialog3: {
    question: `I there anything you want to accomplish?`,
  },
  dialog4: {
    question: `Why are you abstaining from contact?`,
  },
  dialog5: {
    question: `Oh hey what's up with that?`,
  },
}

// dialog1 answer after closing it
function answerDialog1(positiveAnswer) {
  // change what the dialog says
  if (positiveAnswer) {
    $(`#dialog-question`).text(dialogData.dialog1.answer1);
  } else {
    $(`#dialog-question`).text(dialogData.dialog1.answer2);
  };

  // remove the buttons
  $(`#dialog-question`).dialog({
    buttons: [],
  });

  // open the dialog
  $(`#dialog-question`).dialog("open");
}
