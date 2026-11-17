const letterLines = [
  "If I'm honest, I didn't want to leave.",
  "Not even close",
  "Not even a little bit",
  "Not even at all",
  "...",
  "I told myself you deserved something whole",
  "It wasn't that I lacked love",
  "I just thought I had to become more",
  "before I could stand next to you",
  "...",
  "Then I'd see you,",
  "close yet far,",
  "and forget",
  "why distance ever felt like an answer.",
  "...",
  "After all this time",
  "I am losing my head over you.",
  "Grieving of what could've been",
  "...",
  "I missed you.",
  "Yes, you heard me.",
  "I missed holding your hand,",
  "Being next to you,",
  "talking to you",
  "...",
  "If you ask me",
  "when I knew",
  "I'll say \"It wasn't a choice\"",
  "It just always was.",
  "...",
  "If you're mad then I urge you,",
  "come be angry at a nearer distance.",
  "...",
  "So if there's room, even a little,",
  "I'd like to talk.",
  "No pressure.",
  "I just want to know how you are.",
];

let currentLine = 0;
let typingTimer;

const EMAILJS_SERVICE_ID = "service_hva6all";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_TEMPLATES = {
  no: "template_qe5oqvr",
  sure: "template_7y8pyfw",
};
const NOTIFICATION_EMAIL = "akosibbear38@gmail.com";

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

function setupAudioPlayer() {
  const audio = document.getElementById("song");
  const playButton = document.getElementById("play-toggle");
  const progress = document.getElementById("song-progress");
  const currentTime = document.getElementById("current-time");
  const duration = document.getElementById("duration");
  const status = document.getElementById("audio-status");

  playButton.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
      } catch (error) {
        status.textContent = "Could not play the local audio file.";
        playButton.setAttribute("aria-label", "Audio could not be played");
      }
    } else {
      audio.pause();
    }
  });

  audio.addEventListener("play", () => {
    status.textContent = "";
    playButton.textContent = "Ⅱ";
    playButton.setAttribute("aria-label", "Pause Nothing");
    playButton.setAttribute("aria-pressed", "true");
  });
  audio.addEventListener("pause", () => {
    playButton.textContent = "▶";
    playButton.setAttribute("aria-label", "Play Nothing");
    playButton.setAttribute("aria-pressed", "false");
  });
  audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
  });
  audio.addEventListener("error", () => {
    status.textContent = "Could not load the local audio file.";
  });
  audio.addEventListener("timeupdate", () => {
    currentTime.textContent = formatTime(audio.currentTime);
    progress.value = audio.duration
      ? String((audio.currentTime / audio.duration) * 100)
      : "0";
  });
  progress.addEventListener("input", () => {
    if (audio.duration)
      audio.currentTime = (Number(progress.value) / 100) * audio.duration;
  });
  document.querySelectorAll("[data-seek]").forEach((button) => {
    button.addEventListener("click", () => {
      audio.currentTime = Math.max(
        0,
        Math.min(
          audio.duration || Infinity,
          audio.currentTime + Number(button.dataset.seek),
        ),
      );
    });
  });
}

function showLetterLine(index) {
  currentLine = Math.max(0, Math.min(index, letterLines.length - 1));
  clearTimeout(typingTimer);
  const container = document.getElementById("typewriter-container");
  container.replaceChildren();
  const line = document.createElement("p");
  line.className = "hero__description is-typing";
  container.appendChild(line);
  typeWriterEffect(letterLines[currentLine], line, () => {
    const controls = document.createElement("div");
    controls.className = "letter__controls";
    const previous = document.createElement("button");
    previous.className = "letter-button letter-button--quiet";
    previous.textContent = "Previous";
    previous.disabled = currentLine === 0;
    previous.addEventListener("click", () => showLetterLine(currentLine - 1));
    if (currentLine < letterLines.length - 1) {
      controls.append(previous);
      const next = document.createElement("button");
      next.className = "letter-button";
      next.textContent = "Next";
      next.addEventListener("click", () => showLetterLine(currentLine + 1));
      controls.append(next);
    } else {
      const responses = document.createElement("div");
      responses.className = "letter__responses";
      [
        {
          label: "No",
          className: "letter-button letter-button--quiet",
          onClick: () => showNoConfirmation(1),
        },
        {
          label: "Sure",
          className: "letter-button",
          onClick: showSureConfirmation,
        },
      ].forEach(({ label, className, onClick }) =>
        responses.append(createButton(label, onClick, className)),
      );
      container.appendChild(responses);
      controls.append(previous);
      container.appendChild(controls);
      return;
    }
    container.appendChild(controls);
  });
}

function createButton(label, onClick, className = "letter-button") {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.textContent = label;
  button.addEventListener("click", onClick);
  return button;
}

function renderLetterScreen({ text, image, actions, imageAlt = "" }) {
  clearTimeout(typingTimer);
  const container = document.getElementById("typewriter-container");
  container.replaceChildren();

  if (image) {
    const illustration = document.createElement("img");
    illustration.className = "letter-response-image";
    illustration.src = image;
    illustration.alt = imageAlt;
    container.appendChild(illustration);
  }

  const line = document.createElement("p");
  line.className = "hero__description is-typing";
  container.appendChild(line);
  typeWriterEffect(text, line, () => {
    if (actions?.length) {
      const controls = document.createElement("div");
      controls.className = "letter__responses";
      actions.forEach((action) =>
        controls.append(
          createButton(action.label, action.onClick, action.className),
        ),
      );
      container.appendChild(controls);
    }
  });
}

function showNoConfirmation(step) {
  const confirmation =
    step === 1
      ? {
          text: "Are you sure?",
          image: "/are%20you%20sure1.jpe",
          imageAlt: "Are you sure?",
        }
      : step === 2
        ? {
            text: "Are you really sure?",
            image: "/areyousure2.jpe",
            imageAlt: "Are you really sure?",
          }
        : {
            text: "Are you really, really sure?",
            image: "/areyousure2.jpe",
            imageAlt: "One more confirmation",
          };

  renderLetterScreen({
    ...confirmation,
    actions: [
      {
        label: "Yes",
        onClick: () =>
          step < 3 ? showNoConfirmation(step + 1) : showNoUnderstood(),
      },
      {
        label: "No",
        className: "letter-button letter-button--quiet",
        onClick: () =>
          step === 1
            ? showLetterLine(letterLines.length - 1)
            : showNoConfirmation(step - 1),
      },
    ],
  });
}

function showNoUnderstood() {
  renderLetterScreen({
    text: "Okay, I understand",
    actions: [{ label: "Next", onClick: showNoFarewell }],
  });
}

function showNoFarewell() {
  let status;
  renderLetterScreen({
    text: "I wish you all the best",
    image: "/understand.jpe",
    imageAlt: "A kind farewell",
    actions: [
      {
        label: "Back to home",
        onClick: async (event) => {
          const button = event.currentTarget;
          button.disabled = true;
          status.textContent = "Sending...";
          try {
            await sendEmail(EMAILJS_TEMPLATES.no, "No");
          } catch (error) {
            try {
              sessionStorage.setItem(
                "email-notification-error",
                "Notification wasn't sent. Reconnect Gmail in EmailJS and try again.",
              );
            } catch {
              // Continue home even if browser storage is unavailable.
            }
          }
          window.location.assign(
            `${window.location.pathname}${window.location.search}`,
          );
        },
      },
    ],
  });
  status = document.createElement("span");
  status.className = "letter-status";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  document.getElementById("typewriter-container").appendChild(status);
}

function showSureConfirmation() {
  renderLetterScreen({
    text: "wait really",
    image: "/wytreally.jpe",
    imageAlt: "Wait, really?",
    actions: [{ label: "Yes", onClick: showCinemaAndNotify }],
  });
}

function showCinemaAndNotify() {
  clearTimeout(typingTimer);
  const container = document.getElementById("typewriter-container");
  container.replaceChildren();
  const image = document.createElement("img");
  image.className = "letter-response-image";
  image.src = "/absolutecinema.jpe";
  image.alt = "Absolute cinema";
  container.appendChild(image);

  const status = document.createElement("span");
  status.className = "letter-status";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  status.textContent = "Sending...";
  container.appendChild(status);

  const actions = document.createElement("div");
  actions.className = "letter__responses";
  const next = createButton("Next", () => showCatMessage(0));
  next.disabled = true;
  actions.appendChild(next);
  container.appendChild(actions);

  sendEmail(EMAILJS_TEMPLATES.sure, "Sure")
    .then(() => {
      status.textContent = "";
      next.disabled = false;
    })
    .catch((error) => {
      status.textContent = error.message;
      const retry = createButton(
        "Retry notification",
        () => {
          retry.disabled = true;
          status.textContent = "Sending...";
          sendEmail(EMAILJS_TEMPLATES.sure, "Sure")
            .then(() => {
              status.textContent = "";
              retry.remove();
              next.disabled = false;
            })
            .catch((retryError) => {
              status.textContent = retryError.message;
              retry.disabled = false;
            });
        },
        "letter-button letter-button--quiet",
      );
      actions.insertBefore(retry, next);
    });
}

function showCatMessage(index) {
  const messages = ["wait nawawala pusa k 🐈", "hanapin k lang sha"];
  const isLast = index === messages.length - 1;
  renderLetterScreen({
    text: messages[index],
    actions: [
      isLast
        ? { label: "Start over", onClick: resetLetter }
        : { label: "Next", onClick: () => showCatMessage(index + 1) },
    ],
  });
}

async function sendEmail(templateId, response) {
  if (!EMAILJS_PUBLIC_KEY) {
    throw new Error(
      "EmailJS Public Key is missing. Add VITE_EMAILJS_PUBLIC_KEY to .env.local.",
    );
  }

  const result = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: templateId,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: {
        response,
        choice: response,
        button_choice: response,
        to_email: NOTIFICATION_EMAIL,
      },
    }),
  });

  if (!result.ok) {
    const detail = await result.text();
    throw new Error(detail || "EmailJS could not send the notification.");
  }
}

function resetLetter() {
  clearTimeout(typingTimer);
  currentLine = 0;
  const section = document.getElementById("letter");
  const envelope = document.getElementById("letter-envelope");
  const openButton = document.getElementById("open-letter");
  const paper = document.getElementById("letter-paper");
  section.classList.remove("is-opening");
  envelope.hidden = false;
  envelope.classList.remove("is-opening");
  openButton.hidden = false;
  openButton.disabled = false;
  paper.classList.remove("is-visible");
  paper.hidden = true;
  document.getElementById("typewriter-container").replaceChildren();
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

function typeWriterEffect(text, element, done) {
  let index = 0;
  function typeNext() {
    if (index < text.length) {
      element.textContent += text[index++];
      typingTimer = window.setTimeout(typeNext, 34);
      return;
    }
    element.classList.remove("is-typing");
    done();
  }
  typeNext();
}

function setupScrollReveals() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) =>
        entry.target.classList.toggle("is-visible", entry.isIntersecting),
      );
    },
    { threshold: 0.18, rootMargin: "-5% 0px -5% 0px" },
  );
  document
    .querySelectorAll(".reveal")
    .forEach((element) => observer.observe(element));

  const landing = document.querySelector(".landing");
  const player = document.querySelector(".music-widget");
  const playerObserver = new IntersectionObserver(
    ([entry]) => {
      const isFloating = entry.intersectionRatio < 0.15;
      player.classList.toggle("is-floating", isFloating);
      landing.classList.toggle("has-floating-player", isFloating);
    },
    { threshold: [0, 0.15, 1] },
  );
  playerObserver.observe(landing);
}

function setupLetterOpening() {
  const section = document.getElementById("letter");
  const envelope = document.getElementById("letter-envelope");
  const openButton = document.getElementById("open-letter");
  const paper = document.getElementById("letter-paper");
  openButton.addEventListener("click", () => {
    openButton.disabled = true;
    section.classList.add("is-opening");
    envelope.classList.add("is-opening");
    window.setTimeout(() => {
      envelope.hidden = true;
      openButton.hidden = true;
      paper.hidden = false;
      requestAnimationFrame(() => paper.classList.add("is-visible"));
      showLetterLine(0);
      paper.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 520);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  setupAudioPlayer();
  setupScrollReveals();
  setupLetterOpening();
  try {
    const notificationError = sessionStorage.getItem(
      "email-notification-error",
    );
    if (notificationError) {
      document.getElementById("audio-status").textContent = notificationError;
      sessionStorage.removeItem("email-notification-error");
    }
  } catch {
    // The home page works normally when session storage is unavailable.
  }
});
