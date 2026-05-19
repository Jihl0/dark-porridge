// Initialize AOS (Animate On Scroll) library
AOS.init({
  duration: 800,
  offset: 100,
  easing: "ease-in-out",
  once: true,
});

// Artifact data lives in one array so you can swap text and images without touching layout code.
const artifacts = [
  {
    title: "The Dark Disc",
    image:
      "https://pilipinasrecipes.com/wp-content/uploads/2017/03/Tablea-Tsokolate-Recipe.jpg",
    imageSource: "Image Source: Pilipinas Recipes",
    imageDescription: "Image of cocoa tablets to dissolve to heat",
    ritualAccount:
      "The brown disc which smells like earth and is small enough to fit in the palm of my hand. I see this one being dissolved rather than consumed. The disc itself is not the food but is an important element which helps make water and rice into something else. This disc is the catalyst for the ritual.",
    decoder:
      "This disk is referred to as tablea, which is a processed product of cacao and used for making tsokolate. Tablea is produced by roasting cacao beans then grinding and pressing them into a tablet form. It is the main component that makes champorado have its unique dark color and taste. The product was introduced during the Manila-Acapulco galleon trade, and cultivation of cacao became popular during the Spanish colonization period in the Philippines. Tablea remains an extensively used ingredient among Filipinos for making champorado and hot chocolate drinks.",
  },
  {
    title: "The Sacred Grains",
    image:
      "https://pindotlang.com/cdn/shop/products/Roundmalagkit.jpg?v=1611229907",
    imageSource: "Image Source: Farm2Metro",
    imageDescription: "Image of rice grains used in the porridge",
    ritualAccount:
      "What type of rice is this? It looks like any other type of rice, but its consistency is different. It’s sticky. Why is it being cooked? Why is it being mixed with the dark disk? What does this little white grain signify in the ceremony?",
    decoder:
      "Malagkit is the name of the type of rice used, which is glutinous rice in English, a widely used ingredient in Filipino cooking. In cooking champorado, the malagkit rice acts as the base, giving a soothing feeling when cooked.",
  },
  {
    title: "The Silver Fish",
    image:
      "https://www.thepeachkitchen.com/wp-content/uploads/2011/04/tuyo.jpg",
    imageSource: "Image Source: The Peach Kitchen",
    imageDescription: "Image of dried salted fish",
    ritualAccount:
      "What type of fish is this? This seems to be a fish that has been dried and salted. Why is this being included? Porridge has been sweetened; why should we now include saltiness? What role does it play in the ritual? Why is this fish dried in the first place?",
    decoder:
      "Tuyo is a dried and salted fish that is one of the staple foods of the Philippines. It can be included in the preparation of different kinds of dishes due to its savory taste.",
  },
  {
    title: "The Heavy Vessel",
    image:
      "https://i0.wp.com/www.astigvegan.com/wp-content/uploads/2019/06/rice-in-claypot-with-banana-leaves.jpg?resize=562%2C750&ssl=1",
    imageSource: "Image Source: ASTIG Vegan",
    imageDescription: "Image of a pot used to cook",
    ritualAccount:
      "What kind of pot is this? It looks old and heavy. Why not use a rice cooker? Does it need the low flame and the slow cooking process? Why is it important to use this specific vessel for the ritual?",
    decoder:
      "This is a palayok, a traditional Filipino clay pot that is used for cooking. When cooking champorado, the palayok is often used to achieve a slow and even cooking process, allowing the flavors to meld together and creating a comforting and hearty dish.",
  },
  {
    title: "The Sweet Crystals",
    image:
      "https://mediko.ph/wp-content/uploads/2020/03/asukal-pula-at-puti.jpg",
    imageSource: "Image Source: Mediko.PH",
    imageDescription: "Image of crystals that are sweet",
    ritualAccount:
      "Brown crystals and white crystals. Both are sweet, but they differ in appearance. Why are there two types of sweeteners? Do they have different tastes? Why are they used towards the end of the ritual without even measuring their quantities?",
    decoder:
      "Sugar is one of the most common sweeteners that can be put into champorado to improve its taste. The brown crystals is called muscovado, while the white crystals is granulated sugar. The combination of two kinds of sugar helps create balance of flavors and add richness to the sweetness of the food. Unmeasured addition of sugar is quite common in home cooking, since it gives a person an opportunity to change the sweetness according to his/her taste. In the context of the ritual of preparing champorado, the addition of sugar at the very end helps personalize the dish.",
  },
  {
    title: "The Milk River",
    image:
      "https://www.alaskamilk.com/wp-content/uploads/2017/07/New-Project-10.jpg",
    imageSource: "Image Source: Alaska Milk",
    imageDescription: "Image of a milky substance",
    ritualAccount:
      "This milk, it looks like it has been added to the porridge. Why not use water or another liquid? Does this burnt porridge need milk? Why is it important to use this specific ingredient for the ritual?",
    decoder:
      "Evaporated milk is commonly used in the preparation of champorado because of the effect it gives to the food. It makes champorado have a creamier and lighter taste, making the dish more elevated.",
  },
];

// Cached DOM references.
const artifactGrid = document.getElementById("artifact-grid");
const notesToggle = document.getElementById("notes-toggle");
const introText = document.getElementById("intro-text");
const ethnographerNotes = document.getElementById("ethnographer-notes");
const modal = document.getElementById("artifact-modal");
const modalTitle = document.getElementById("modal-title");
const modalImageLabel = document.getElementById("modal-image-label");
const ritualPanel = document.getElementById("panel-ritual");
const decoderPanel = document.getElementById("panel-decoder");
const tabButtons = Array.from(document.querySelectorAll("[data-tab]"));
const modalContent = modal.querySelector(".modal__content");

let lastFocusedElement = null;

// Render the artifact gallery from the data array.
function renderArtifacts() {
  artifactGrid.innerHTML = artifacts
    .map(
      (artifact, index) => `
        <button class="artifact-card" type="button" data-artifact-index="${index}" data-aos="zoom-in" data-aos-delay="${index * 100}">
          <div class="artifact-card__media-wrapper" data-image-source="${artifact.imageSource}" data-image-description="${artifact.imageDescription}">
            <img class="artifact-card__media" src="${artifact.image}" alt="Placeholder illustration for ${artifact.title}" loading="lazy" />
          </div>
          <div class="artifact-card__body">
            <h3>${artifact.title}</h3>
            <p>Open artifact details</p>
          </div>
        </button>
      `,
    )
    .join("");
}

// Intro notes toggle.
function openNotes() {
  notesToggle.setAttribute("aria-expanded", "true");
  introText.hidden = true;
  ethnographerNotes.hidden = false;
  requestAnimationFrame(() => {
    ethnographerNotes.classList.add("is-open");
    ethnographerNotes.style.maxHeight = `${ethnographerNotes.scrollHeight}px`;
  });
}

function closeNotes() {
  notesToggle.setAttribute("aria-expanded", "false");
  ethnographerNotes.style.maxHeight = `${ethnographerNotes.scrollHeight}px`;
  requestAnimationFrame(() => {
    ethnographerNotes.classList.remove("is-open");
    ethnographerNotes.style.maxHeight = "0px";
  });
  window.setTimeout(() => {
    ethnographerNotes.hidden = true;
    introText.hidden = false;
  }, 360);
}

function toggleNotes() {
  const isExpanded = notesToggle.getAttribute("aria-expanded") === "true";
  if (isExpanded) {
    closeNotes();
  } else {
    openNotes();
  }
}

// Switch between ritual and decoder panels.
function setActiveTab(tabName) {
  const isRitual = tabName === "ritual";

  tabButtons.forEach((button) => {
    const selected = button.dataset.tab === tabName;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
  });

  ritualPanel.hidden = !isRitual;
  decoderPanel.hidden = isRitual;
  ritualPanel.classList.toggle("is-active", isRitual);
  decoderPanel.classList.toggle("is-active", !isRitual);
}

// Inject the selected artifact into the modal.
function updateModalContent(index) {
  const artifact = artifacts[index];
  modalTitle.textContent = artifact.title;
  modalImageLabel.textContent = artifact.title;
  ritualPanel.textContent = artifact.ritualAccount;
  decoderPanel.textContent = artifact.decoder;
  setActiveTab("ritual");
}

function getFocusableElements(container) {
  return Array.from(
    container.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => element.offsetParent !== null);
}

function openModal(index) {
  lastFocusedElement = document.activeElement;
  updateModalContent(index);
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  window.addEventListener("keydown", handleModalKeydown);

  const focusTarget = modal.querySelector(".modal__close") || modalContent;
  window.setTimeout(() => focusTarget.focus(), 0);
}

// Close the modal and restore the previous focus target.
function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  window.removeEventListener("keydown", handleModalKeydown);

  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
}

// Escape closes the modal; Tab is trapped inside the dialog.
function handleModalKeydown(event) {
  if (!modal.classList.contains("is-open")) {
    return;
  }

  if (event.key === "Escape") {
    event.preventDefault();
    closeModal();
    return;
  }

  if (event.key === "Tab") {
    const focusable = getFocusableElements(modalContent);
    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}

artifactGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-artifact-index]");
  if (!card) {
    return;
  }

  openModal(Number(card.dataset.artifactIndex));
});

notesToggle.addEventListener("click", toggleNotes);

modal.addEventListener("click", (event) => {
  if (event.target.matches("[data-close-modal]")) {
    closeModal();
    return;
  }

  if (event.target === modal) {
    closeModal();
  }
});

tabButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveTab(button.dataset.tab));
});

renderArtifacts();
setActiveTab("ritual");

// Prevent dragging of images that are part of the media-wrapper or artifact cards.
document.addEventListener("dragstart", (e) => {
  const img = e.target;
  if (img && img.tagName === "IMG") {
    if (
      img.closest(".artifact-card__media-wrapper") ||
      img.closest(".media-wrapper") ||
      img.closest(".artifact-card")
    ) {
      e.preventDefault();
    }
  }
});

/* ==============================================
   Rain Audio Toggle — Default ON
   ============================================== */

const audioToggle = document.getElementById("audio-toggle");
const audioIcon = document.getElementById("audio-icon");
const rainAudio = document.getElementById("rain-audio");

let isPlaying = false;

// Set volume low for ambient feel
rainAudio.volume = 0.3;

// Try to autoplay immediately
rainAudio
  .play()
  .then(() => {
    isPlaying = true;
    audioIcon.textContent = "🔊";
    audioToggle.classList.remove("is-muted");
  })
  .catch(() => {
    // Autoplay was blocked — show muted state and wait for interaction
    isPlaying = false;
    audioIcon.textContent = "🔇";
    audioToggle.classList.add("is-muted");

    // Start playing on first user interaction
    function startRainOnInteraction() {
      if (!isPlaying) {
        rainAudio.volume = 0.3;
        rainAudio
          .play()
          .then(() => {
            isPlaying = true;
            audioIcon.textContent = "🔊";
            audioToggle.classList.remove("is-muted");
          })
          .catch(() => {});
        // Remove listeners after successful start
        document.removeEventListener("click", startRainOnInteraction);
        document.removeEventListener("scroll", startRainOnInteraction);
      }
    }

    document.addEventListener("click", startRainOnInteraction);
    document.addEventListener("scroll", startRainOnInteraction);
  });

// Toggle on button click
audioToggle.addEventListener("click", (e) => {
  e.stopPropagation(); // Don't trigger document click listener

  if (isPlaying) {
    rainAudio.pause();
    isPlaying = false;
    audioIcon.textContent = "🔇";
    audioToggle.classList.add("is-muted");
  } else {
    rainAudio.volume = 0.3;
    rainAudio
      .play()
      .then(() => {
        isPlaying = true;
        audioIcon.textContent = "🔊";
        audioToggle.classList.remove("is-muted");
      })
      .catch(() => {
        isPlaying = false;
        audioIcon.textContent = "🔇";
        audioToggle.classList.add("is-muted");
      });
  }
});
