/*
file containing the dialog data
*/


let dialogData = {
  dialog1: {
    question: `What do you think about travelling closer to them?`,
    button1: {
      text: `yes`,
      click: function() {
        $(this).dialog("close");
      },
    },
    button2: {
      text: `no`,
      click: function() {
        $(this).dialog("close");
      },
    }
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
