document.addEventListener('DOMContentLoaded', function () {
    // Get modal elements and buttons
    const soulModal = document.getElementById("soulModal");
    const rewardModal = document.getElementById("rewardModal");
    const inventoryModal = document.getElementById("inventoryModal");
    const noSoulModal = document.getElementById("noSoulModal");
    const sellBtn = document.getElementById("sell-soul-button");
    const viewInventoryBtn = document.getElementById("view-inventory-button");
    const closeBtn = document.querySelector(".close");
    const closeRewardBtn = document.querySelector(".close-reward");
    const closeInventoryBtn = document.querySelector(".close-inventory");
    const closeNoSoulBtn = document.querySelector(".close-no-soul");
    const grimReaperImg = document.querySelector(".grim-reaper");
  
    // Check if soul has already been sold (inventory exists)
    if (isSoulSold()) {
      // Show the inventory button
      viewInventoryBtn.style.display = "inline-block";
    }
  
    // Function to toggle visibility of a modal
    function toggleModal(modalElement, show) {
      if (show) {
        modalElement.classList.add("active");
      } else {
        modalElement.classList.remove("active");
      }
    }
  
    // Add subtle floating animation to the grim reaper image
    function floatAnimation() {
      let floatY = 0;
      let direction = 1;
      const speed = 0.1;
      const maxFloat = 10;
      
      setInterval(() => {
        floatY += speed * direction;
        if (floatY > maxFloat || floatY < 0) {
          direction *= -1;
        }
        grimReaperImg.style.transform = `translateY(${floatY}px)`;
      }, 50);
    }
    
    // Start the floating animation
    floatAnimation();
  
    // Open the first modal when the "Sell your Soul" button is clicked
    sellBtn.addEventListener('click', function () {
      // Check if the soul is already sold
      if (isSoulSold()) {
        toggleModal(noSoulModal, true);
        return;
      }
      
      toggleModal(soulModal, true);
      
      // Add spooky effect when the modal opens
      const audio = new Audio('https://freesound.org/data/previews/368/368273_6687067-lq.mp3');
      audio.volume = 0.2;
      try {
        audio.play().catch(e => console.log("Audio play failed, likely due to browser autoplay policy"));
      } catch (e) {
        console.log("Audio playback error, likely due to browser restrictions");
      }
    });
  
    // Handle viewing inventory
    viewInventoryBtn.addEventListener('click', function() {
      displayInventory();
      toggleModal(inventoryModal, true);
    });
  
    // Display all items in the inventory
    function displayInventory() {
      const inventoryContainer = document.getElementById("inventory-items");
      const inventory = getInventory();
      
      if (inventory.length === 0) {
        inventoryContainer.innerHTML = `<div class="empty-inventory">Your inventory is empty.</div>`;
        return;
      }
      
      let inventoryHTML = '';
      inventory.forEach(item => {
        const acquiredDate = new Date(item.acquiredOn).toLocaleDateString();
        
        inventoryHTML += `
          <div class="inventory-item">
            <div class="inventory-item-image">
              <img src="images/${item.image}" alt="${item.name}" onerror="this.src='/api/placeholder/80/80'; this.onerror=null;">
            </div>
            <h3>${item.name}</h3>
            <p class="${item.rarity.toLowerCase()}">${item.rarity}</p>
            <p class="item-acquired">Acquired: ${acquiredDate}</p>
          </div>
        `;
      });
      
      inventoryContainer.innerHTML = inventoryHTML;
    }
  
    // Close modal event listeners
    closeBtn.addEventListener('click', () => toggleModal(soulModal, false));
    closeRewardBtn.addEventListener('click', () => toggleModal(rewardModal, false));
    closeInventoryBtn.addEventListener('click', () => toggleModal(inventoryModal, false));
    closeNoSoulBtn.addEventListener('click', () => toggleModal(noSoulModal, false));
    
    document.getElementById("closeInventory").addEventListener('click', () => {
      toggleModal(inventoryModal, false);
    });
    
    document.getElementById("closeNoSoul").addEventListener('click', () => {
      toggleModal(noSoulModal, false);
    });
  
    // Close modals when clicking outside them
    window.addEventListener('click', function (e) {
      if (e.target === soulModal) toggleModal(soulModal, false);
      if (e.target === rewardModal) toggleModal(rewardModal, false);
      if (e.target === inventoryModal) toggleModal(inventoryModal, false);
      if (e.target === noSoulModal) toggleModal(noSoulModal, false);
    });
  
    // Sell soul and get random item
    document.getElementById("confirmSell").addEventListener('click', function () {
      toggleModal(soulModal, false);  // Close the soul modal
      
      // Select a random item based on probability
      const selectedItem = selectRandomItem();
      
      // Add a small delay for suspense
      setTimeout(() => {
        // Display the selected item in the reward modal
        displaySelectedItem(selectedItem);
        toggleModal(rewardModal, true);  // Open the reward modal
        
        // Show the inventory button once soul is sold
        viewInventoryBtn.style.display = "inline-block";
      }, 800);
      
      // Play another sound effect for the reward
      const rewardSound = new Audio('https://freesound.org/data/previews/320/320655_5260872-lq.mp3');
      rewardSound.volume = 0.3;
      try {
        rewardSound.play().catch(e => console.log("Audio play failed"));
      } catch (e) {
        console.log("Audio playback error");
      }
    });
  
    // Cancel the soul transaction and close the first modal
    document.getElementById("cancelSell").addEventListener('click', function () {
      toggleModal(soulModal, false);
    });
});

// Function to check if the soul has already been sold
function isSoulSold() {
  return localStorage.getItem('soulSold') === 'true';
}

// Function to mark the soul as sold
function setSoulSold() {
  localStorage.setItem('soulSold', 'true');
}

// Function to get the inventory from local storage
function getInventory() {
  const inventoryString = localStorage.getItem('inventory') || '[]';
  return JSON.parse(inventoryString);
}

// Function to save the inventory to local storage
function saveInventory(inventory) {
  localStorage.setItem('inventory', JSON.stringify(inventory));
}

// Function to add an item to the inventory
function addItemToInventory(item) {
  const inventory = getInventory();
  
  // Add acquisition date to the item
  const itemWithDate = {
    ...item,
    acquiredOn: new Date().toISOString()
  };
  
  inventory.push(itemWithDate);
  saveInventory(inventory);
  
  // Mark the soul as sold
  setSoulSold();
}

// Function to select a random item based on probability
function selectRandomItem() {
  // Calculate total probability - ideally should sum to 1 (100%)
  const totalProbability = divineItems.reduce((sum, item) => sum + item.probability, 0);
  
  // Generate a random value between 0 and the total probability
  const randomValue = Math.random() * totalProbability;
  
  // Find which item corresponds to this random value
  let cumulativeProbability = 0;
  for (const item of divineItems) {
    cumulativeProbability += item.probability;
    if (randomValue <= cumulativeProbability) {
      return item;
    }
  }
  
  // Fallback to return the last item in case of any precision errors
  return divineItems[divineItems.length - 1];
}

// Function to display the selected item in the reward modal
function displaySelectedItem(item) {
  const rewardModal = document.getElementById("rewardModal");
  const modalContent = rewardModal.querySelector(".modal-content");
  
  // Create HTML for the reward modal
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
  
  // Add event listener to the new close button
  const closeRewardBtn = modalContent.querySelector(".close-reward");
  closeRewardBtn.addEventListener('click', () => {
    rewardModal.classList.remove("active");
  });
  
  // Add event listener to the accept button
  const acceptBtn = document.getElementById("acceptReward");
  acceptBtn.addEventListener('click', () => {
    // Add the item to the inventory
    addItemToInventory(item);
    
    // Close the reward modal
    rewardModal.classList.remove("active");
  });
  
  // Add the item to inventory automatically when displaying
  addItemToInventory(item);
}

// Optional: Add a function to reset the game (for testing)
function resetGame() {
  localStorage.removeItem('soulSold');
  localStorage.removeItem('inventory');
  location.reload();
}

// Uncomment the following code to add a reset button for testing
document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.container');
  const resetBtn = document.createElement('button');
  resetBtn.textContent = 'Reset Game (Dev)';
  resetBtn.style.marginTop = '10px';
  resetBtn.style.background = '#333';
  resetBtn.style.fontSize = '0.8em';
  resetBtn.addEventListener('click', resetGame);
  container.appendChild(resetBtn);
});