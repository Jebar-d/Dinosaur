const messages = [
  "I didn't want my confession to be an message only",
  "So I thought I could add in a little effort^^",
  "and I should have said this when we we're together",
  "But I was too shy to say it in person",
  "Anyways, Sorry for not messaging you until now",
  "I didn't mean to I just needed time to do this:>",
  "Tbh I don't know how to express my feelings",
  "I always struggle at expressing them, so this is only the way I know",
  "I made you a poem, I was supposed to give you this by a letter in person",
  "But I think this is more of a efficient way of showing you how I feel",
  "I hope you'll like it, and I hope you don't mind me doing this",
  "The poem goes like this:",
  // Poem, each line or logical part as a separate message
  "If I am honest I didn’t mean to like you.",
  "Not at first.",
  "Not in the way that changes the weight of a day.",
  "But then you looked at me",
  "and I forgot how to stand still.",
  "If I am honest it’s not the way you smile.",
  "It’s the way you soften the world.",
  "The way silence becomes safe when you’re near.",
  "Like how the sun loves the sky always there, without demand.",
  "Even after all this time,",
  "the sun never says to the earth,",
  "“You owe me.”",
  "And with a love like that,",
  "it lights the whole sky.",
  "I like you.",
  "Not by accident,",
  "but by every quiet decision",
  "my heart made",
  "when I wasn’t looking.",
  "And if you ask me",
  "when it began,",
  "I’ll say: It didn’t.",
  "It just always was.",
  "..."
];

function typeWriterEffect(text, container, callback) {
  container.classList.remove('done');
  container.innerHTML = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      if (text.slice(i, i+4) === "<br>") {
        container.innerHTML += "<br>";
        i += 4;
      } else {
        container.innerHTML += text.charAt(i);
        i++;
      }
      setTimeout(type, 30);
    } else {
      container.classList.add('done'); // Remove cursor after typing
      callback();
    }
  }
  type();
}

function showMessage(index) {
  const container = document.getElementById('typewriter-container');
  container.innerHTML = '';
  const p = document.createElement('p');
  p.className = 'hero__description';
  container.appendChild(p);

  // If the message is an empty string, add a <br> for spacing
  if (messages[index] === "") {
    p.innerHTML = "<br>";
    p.classList.add('done');
    addNextButton(index, container);
  } else {
    typeWriterEffect(messages[index], p, () => {
      addNextButton(index, container);
    });
  }
}

function addNextButton(index, container) {
  if (index < messages.length - 1) {
    const btn = document.createElement('button');
    btn.textContent = 'Next';
    btn.className = 'hero__btn btn';
    btn.onclick = () => showMessage(index + 1);
    container.appendChild(btn);
  }
  // No button after the last message
}

// Initial state: show "Start" button only
window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('typewriter-container');
  container.innerHTML = '';
  const btn = document.createElement('button');
  btn.textContent = 'Start';
  btn.className = 'hero__btn btn';
  btn.onclick = () => showMessage(0);
  container.appendChild(btn);
});