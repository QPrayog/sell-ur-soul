document.addEventListener('DOMContentLoaded', function () {
  // === Modal Elements ===
  const soulModal = document.getElementById("soulModal");
  const rewardModal = document.getElementById("rewardModal");
  const inventoryModal = document.getElementById("inventoryModal");
  const noSoulModal = document.getElementById("noSoulModal");
  const statsModal = document.getElementById("statsModal");

  // === Buttons ===
  const sellBtn = document.getElementById("sell-soul-button");
  const viewInventoryBtn = document.getElementById("view-inventory-button");
  const statsBtn = document.getElementById("stats-button");
  // Show inventory button if soul was already sold
if (isSoulSold()) {
  viewInventoryBtn.style.display = "inline-block";
}


  // === Toggle Modal Visibility ===
  function toggleModal(modal, show) {
    modal.classList.toggle("active", show);
  }

  // === Setup Close Buttons and Outside Clicks ===
  function setupCloseListeners() {
    document.querySelectorAll(".close, .close-reward, .close-inventory, .close-no-soul, .close-stats, .close-bottom").forEach(btn => {
      btn.addEventListener("click", () => {
        const modal = btn.closest(".modal");
        if (modal) toggleModal(modal, false);
      });
    });

    window.addEventListener("click", function (e) {
      [soulModal, rewardModal, inventoryModal, noSoulModal, statsModal].forEach(modal => {
        if (e.target === modal) toggleModal(modal, false);
      });
    });
  }

  setupCloseListeners();
  // === Admin Item Grant UI ===
function createAdminItemPanel() {
  const panel = document.createElement('div');
  panel.id = 'adminItemPanel';
  panel.style = `
    margin-top: 20px;
    background: rgba(255,255,255,0.05);
    padding: 20px;
    border: 1px solid red;
    border-radius: 10px;
    max-width: 400px;
  `;

  const label = document.createElement('label');
  label.textContent = "Choose Item:";
  label.style.display = "block";
  label.style.marginBottom = "8px";
  panel.appendChild(label);

  const select = document.createElement('select');
  select.id = 'adminItemSelect';
  select.style = "width: 100%; padding: 10px; margin-bottom: 15px;";
  divineItems.forEach(item => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = `${item.name} (${item.rarity})`;
    select.appendChild(option);
  });
  panel.appendChild(select);

  const giveBtn = document.createElement('button');
  giveBtn.textContent = 'Grant Item';
  giveBtn.style = "padding: 10px 20px; background: darkred; color: white; border: none; cursor: pointer;";
  giveBtn.addEventListener('click', () => {
    const id = parseInt(select.value);
    const item = divineItems.find(i => i.id === id);
    if (item) {
      addItemToInventory(item);
      alert(`Granted: ${item.name}`);
      viewInventoryBtn.style.display = "inline-block";
    }
  });
  panel.appendChild(giveBtn);

  document.querySelector('.container').appendChild(panel);
}

// === Shortcut: Ctrl + Shift + I to show admin item panel ===
document.addEventListener('keydown', function (e) {
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') {
    e.preventDefault();
    if (!document.getElementById('adminItemPanel')) {
      createAdminItemPanel();
    }
  }
});


  // === Sell Soul Button Logic ===
  sellBtn.addEventListener("click", function () {
    if (isSoulSold()) {
      toggleModal(noSoulModal, true);
      return;
    }
    toggleModal(soulModal, true);

    const spookySound = new Audio("https://freesound.org/data/previews/368/368273_6687067-lq.mp3");
    spookySound.volume = 0.2;
    spookySound.play().catch(() => console.log("Spooky sound blocked by browser."));
  });

  // === Inventory Button ===
  viewInventoryBtn.addEventListener("click", function () {
    displayInventory();
    toggleModal(inventoryModal, true);
  });

  // === Stats Button ===
  statsBtn.addEventListener("click", function () {
    updateDropRates();
    toggleModal(statsModal, true);
  });

  // === Cancel Soul Transaction ===
  document.getElementById("cancelSell").addEventListener("click", function () {
    toggleModal(soulModal, false);
  });

  // === Confirm Soul Transaction ===
  document.getElementById("confirmSell").addEventListener("click", function () {
    toggleModal(soulModal, false);
    const selectedItem = selectRandomItem();

    setTimeout(() => {
      displaySelectedItem(selectedItem);
      toggleModal(rewardModal, true);
      viewInventoryBtn.style.display = "inline-block";
    }, 800);

    const rewardSound = new Audio("https://freesound.org/data/previews/320/320655_5260872-lq.mp3");
    rewardSound.volume = 0.3;
    rewardSound.play().catch(() => console.log("Reward sound blocked by browser."));
  });

  // === Display Reward Item ===
  function displaySelectedItem(item) {
    const modalContent = rewardModal.querySelector(".modal-content");
    const rarityClass = item.rarity.toLowerCase();

    modalContent.innerHTML = `
      <span class="close-reward">&times;</span>
      <h2>YOUR REWARD</h2>
      <p>Your soul has been collected. In exchange, you receive:</p>
      <div class="item-reward">
        <div class="item-image-container">
          <img src="images/${item.image}" alt="${item.name}" class="item-image" onerror="this.src='/api/placeholder/150/150'; this.onerror=null;">
        </div>
        <div class="item-details">
          <h3>${item.name}</h3>
          <p class="item-rarity ${rarityClass}">${item.rarity}</p>
          <p class="item-description">${item.description}</p>
        </div>
      </div>
      <div class="modal-buttons">
        <button id="acceptReward">ACCEPT</button>
      </div>
    `;

    modalContent.querySelector(".close-reward").addEventListener("click", () => {
      toggleModal(rewardModal, false);
    });

    document.getElementById("acceptReward").addEventListener("click", () => {
      addItemToInventory(item);
      toggleModal(rewardModal, false);
    });

    addItemToInventory(item);
  }

  // === Show Inventory ===
  function displayInventory() {
    const inventoryContainer = document.getElementById("inventory-items");
    const inventory = getInventory();

    if (inventory.length === 0) {
      inventoryContainer.innerHTML = `<div class="empty-inventory">Your inventory is empty.</div>`;
      return;
    }

    inventoryContainer.innerHTML = inventory.map(item => {
      const acquiredDate = new Date(item.acquiredOn).toLocaleDateString();
      return `
        <div class="inventory-item">
          <div class="inventory-item-image">
            <img src="images/${item.image}" alt="${item.name}" onerror="this.src='/api/placeholder/80/80'; this.onerror=null;">
          </div>
          <h3>${item.name}</h3>
          <p class="${item.rarity.toLowerCase()}">${item.rarity}</p>
          <p class="item-acquired">Acquired: ${acquiredDate}</p>
        </div>
      `;
    }).join('');
  }

  // === Update Stats Modal ===
  function updateDropRates() {
    const statsContainer = document.querySelector('.stats-container');
    statsContainer.innerHTML = '';

    const rarityTotals = {};
    divineItems.forEach(item => {
      rarityTotals[item.rarity] = (rarityTotals[item.rarity] || 0) + item.probability;
    });

    const sortedRarities = Object.keys(rarityOrder).sort((a, b) => rarityOrder[a] - rarityOrder[b]);

    sortedRarities.forEach(rarity => {
      const probability = rarityTotals[rarity] || 0;
      const rarityClass = rarity.toLowerCase();

      const rarityBar = document.createElement('div');
      rarityBar.classList.add('rarity-bar', rarityClass);
      rarityBar.innerHTML = `
        <span>${rarity}</span>
        <div class="percentage-bar">
          <div class="fill" style="width: ${probability * 100}%;"></div>
        </div>
      `;
      statsContainer.appendChild(rarityBar);
    });
  }

  // === Admin Shortcut Toggle (Ctrl + Shift + R) ===
  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'r') {
      e.preventDefault(); // stop browser refresh

      const container = document.querySelector('.container');
      const existing = document.getElementById('adminResetBtn');

      if (existing) {
        existing.remove();
      } else {
        const btn = document.createElement('button');
        btn.id = 'adminResetBtn';
        btn.textContent = 'Reset Game (Admin)';
        Object.assign(btn.style, {
          marginTop: '10px',
          background: '#333',
          fontSize: '0.8em',
          border: '2px solid red',
          color: '#fff',
          padding: '10px 20px',
          cursor: 'pointer'
        });
        btn.addEventListener('click', resetGame);
        container.appendChild(btn);
      }
    }
  });
});

// === Utility Functions ===
function isSoulSold() {
  return localStorage.getItem('soulSold') === 'true';
}

function setSoulSold() {
  localStorage.setItem('soulSold', 'true');
}

function getInventory() {
  const inv = localStorage.getItem('inventory');
  return inv ? JSON.parse(inv) : [];
}

function saveInventory(inventory) {
  localStorage.setItem('inventory', JSON.stringify(inventory));
}

function addItemToInventory(item) {
  const inventory = getInventory();
  const exists = inventory.some(i => i.id === item.id);
  if (exists) return;
  inventory.push({ ...item, acquiredOn: new Date().toISOString() });
  saveInventory(inventory);
  setSoulSold();
}

function selectRandomItem() {
  const total = divineItems.reduce((sum, item) => sum + item.probability, 0);
  let rand = Math.random() * total;
  for (const item of divineItems) {
    if (rand < item.probability) return item;
    rand -= item.probability;
  }
  return divineItems[divineItems.length - 1];
}

function resetGame() {
  localStorage.removeItem('soulSold');
  localStorage.removeItem('inventory');
  location.reload();
}
const itemList = items.map(item => `${item.name} (${item.rarity})`);

const dropdown = document.getElementById("customDropdown");
const selected = dropdown.querySelector(".selected");
const optionsContainer = dropdown.querySelector(".options");

itemList.forEach(item => {
  const option = document.createElement("div");
  option.classList.add("option");
  option.textContent = item;
  option.onclick = () => {
    selected.textContent = item;
    optionsContainer.classList.add("hidden");
  };
  optionsContainer.appendChild(option);
});

selected.onclick = () => {
  optionsContainer.classList.toggle("hidden");
};
function animateLootDrop(itemElement) {
  itemElement.classList.add("loot-animate");

  // Optional: remove the class after animation ends for reusability
  itemElement.addEventListener("animationend", () => {
    itemElement.classList.remove("loot-animate");
  }, { once: true });
}
// When opening modal
document.body.classList.add('modal-open');

// When closing modal
document.body.classList.remove('modal-open');
