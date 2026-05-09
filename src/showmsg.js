// ── Message sequences ─────────────────────────────────────────────────────────

const poemMessages = [
  "Hey, I know this is a bit weird, but I wanted to tell you something",
  "I know we haven't talked much, I just needed some time to gather my thoughts",
  "I wanted to tell you how I feel but I get nervous when I try to say it",
  "So I thought I could write it down instead",
  "I made you a poem, I was supposed to give you this by a letter in person",
  "But I think this is more of a efficient way of showing you how I feel",
  "I hope you'll like it, and I hope you don't mind me doing this",
  "The poem goes like this:",
  "If I am honest I didn't mean to like you.",
  "Not at first.",
  "Not in the way that changes the weight of a day.",
  "But then you looked at me",
  "and I forgot how to stand still.",
  "If I am honest it's not the way you smile.",
  "It's the way you soften the world.",
  "The way silence becomes safe when you're near.",
  "Like how the sun loves the sky always there, without demand.",
  "Even after all this time,",
  "the sun never says to the earth,",
  "You owe me.",
  "And with a love like that,",
  "it lights the whole sky.",
  "I like you.",
  "Not by accident,",
  "but by every quiet decision",
  "my heart made",
  "when I wasn't looking.",
  "And if you ask me",
  "when it began,",
  "I'll say: It didn't.",
  "It just always was.",
  "...",
  "I didn't want my confession to be a message only",
  "So I thought I could add in a little effort^^",
  "and I know I should have said this when we we're together",
  "But I was too shy to say it in person",
  "Anyways, Sorry for not messaging you until now",
  "I didn't mean to I just needed time to do this:>",
  "Tbh I don't know how to express my feelings",
  "I always struggle at expressing them, so this is only the way I know",
  "Again sorry for not messaging you until now",
  "and I hope you enjoyed the poem"
];

const selMessages = [
  "So... How have you been?",
  "This will maybe a surprise you",
  "but I have something to say",
  "Selie, I am Sorry",
  "I am sorry for the pain",
  "I am sorry for the time",
  "Sorry di kita binigyan ng explanation",
  "Kapag gusto m ng explanation,",
  "I'll gladly tell you all of it",
  "But for now, I am sorry",
  "Di ako nageexpect ng forgiveness.",
  "Because I know what I did was wrong",
  "There are many things that I want to tell you.",
  "There are times I wanted to approach you",
  "But how could I",
  "I am not proud of what I have done",
  "And I don't want to bother you anymore",
  "And to make things clear I didn't talk to or meet anyone new ever since.",
  "Because I figured I am not fit to be in a relationship.",
  "I have a lot going on, even now",
  "But I will still hold on to the keychain n binigay m saken",
  "It really means a lot for me and It serves me hope",
  "Some nights, I wonder if I still cross your mind.",
  "I know you do in mine.",
  "But that's not the only thing I think about.",
  "I wonder if you're happy",
  "and I wonder If you met someone who's making you happy",
  "I think thats enough for me. Knowing you, always so bright as your smile.",
  "You deserve the world for just by being in it",
  "I don't know if I'll ever tell you all of this.",
  "Maybe this is for me",
  "Maybe you're already fine without it",
  "and maybe I'll keep the truth for myself",
  "But the truth is, even if it was for a moment",
  "Even if it was short",
  "I enjoyed and cherished every second of it",
  "Because it was real",
  "Atleast for me",
  "Also maybe you're reading this late or not",
  "Happy Birthday 🎂",
  "I wish and pray you the best",
  "Because you deserve it",
  "I hope you find what you long for selie"
];

// ── Core typewriter engine ────────────────────────────────────────────────────

function typeWriterEffect(text, container, callback) {
  container.classList.remove('done');
  container.innerHTML = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      if (text.slice(i, i + 4) === "<br>") {
        container.innerHTML += "<br>";
        i += 4;
      } else {
        container.innerHTML += text.charAt(i);
        i++;
      }
      setTimeout(type, 30);
    } else {
      container.classList.add('done');
      callback();
    }
  }
  type();
}

// ── Navigation menu ───────────────────────────────────────────────────────────

function setSubtitle(text) {
  const subtitle = document.querySelector('.hero__subtitle');
  if (subtitle) subtitle.textContent = text;
}

function showMenu() {
  setSubtitle('Choose a message');

  const container = document.getElementById('typewriter-container');
  container.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'menu__buttons';

  const btn1 = document.createElement('button');
  btn1.innerHTML = 'Poem';
  btn1.className = 'hero__btn btn';
  btn1.onclick = () => {
    setSubtitle("If I'm Honest");
    showMessage(poemMessages, 0);
  };

  const btn2 = document.createElement('button');
  btn2.textContent = 'The truth';
  btn2.className = 'hero__btn btn';
  btn2.onclick = () => {
    setSubtitle('The truth');
    showMessage(selMessages, 0);
  };

  wrapper.appendChild(btn1);
  wrapper.appendChild(btn2);
  container.appendChild(wrapper);
}

// ── Message display ───────────────────────────────────────────────────────────

function showMessage(messages, index) {
  const container = document.getElementById('typewriter-container');
  container.innerHTML = '';

  const p = document.createElement('p');
  p.className = 'hero__description';
  container.appendChild(p);

  if (messages[index] === "") {
    p.innerHTML = "<br>";
    p.classList.add('done');
    addNextButton(messages, index, container);
  } else {
    typeWriterEffect(messages[index], p, () => {
      addNextButton(messages, index, container);
    });
  }
}

function addNextButton(messages, index, container) {
  if (index < messages.length - 1) {
    const btn = document.createElement('button');
    btn.textContent = 'Next';
    btn.className = 'hero__btn btn';
    btn.onclick = () => showMessage(messages, index + 1);
    container.appendChild(btn);
  } else {
    const btn = document.createElement('button');
    btn.textContent = 'Back to Menu';
    btn.className = 'hero__btn btn hero__btn--back';
    btn.onclick = () => showMenu();
    container.appendChild(btn);
  }
}

// ── Boot ──────────────────────────────────────────────────────────────────────

window.addEventListener('DOMContentLoaded', () => {
  showMenu();
});
