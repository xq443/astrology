import { sketch } from "p5js-wrapper";
import ollama from "ollama";

let ollamaMessage = ""; // Store response
let iinput, inprompt, button;


async function fetchOllamaMessage(text) {
  try {
    const response = await ollama.chat({
      model: "llama2", // Assuming you're using llama2
      messages: [{ role: "user", content: text }],
    });
    ollamaMessage = response.message.content; // Store the response for drawing
  } catch (error) {
    console.error("Error fetching Ollama message:", error);
    ollamaMessage = "Error in communication with Ollama."; // Fallback message
  }
}

sketch.setup = function () {
  createCanvas(800, 800);

  iinput = createInput();
  iinput.center('horizontal');
  iinput.position(150, 200);
  iinput.size(400);

  button = createButton('submit');
  button.position(iinput.x + iinput.width, iinput.y);
  button.mousePressed(take_prompt);


  // // Create buttons for each word
  // words.forEach((word) => {
  //   const btn = createButton(word.text);
  //   btn.position(word.x, word.y);
  //   btn.mousePressed(() => {
  //     const question = `With no introduction or punctuation, provide three words that describe ${word.text}. `;
  //     fetchOllamaMessage(question);
  //   });
  // });
};

sketch.draw = function () {
  background(100);
  fill(255);
  noStroke();
  textSize(16);
  textAlign(CENTER, CENTER);
  text(ollamaMessage, 800 / 4, 800 / 2, 800 / 2); // Display the message
};

function take_prompt() {
  inprompt = iinput.value();

  ollamaMessage = "...";

  fetchOllamaMessage(inprompt);
}
