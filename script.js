document.addEventListener("DOMContentLoaded", function () {
  // Fake wallet functionality
  let fakeWallet = {
    balance: 1000,
    updateBalance: function (amount) {
      this.balance += amount;
      document.getElementById("wallet-balance").innerText = this.balance;
    },
    cashOut: function () {
      alert(`You've cashed out $${this.balance}!`);
      this.balance = 0;
      document.getElementById("wallet-balance").innerText = this.balance;
    },
  };

  let pendingWinnings = 0; // Track the winnings from clicked boxes
  let timerInterval; // Store the interval for the timer
  let timeLeft = 30; // Initial countdown time in seconds

  // Initialize grid
  const gridContainer = document.querySelector(".grid");
  for (let i = 0; i < 25; i++) {
    // 5x5 grid
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridItem.addEventListener("click", () => handleGridClick(gridItem));
    gridContainer.appendChild(gridItem);
  }

  function handleGridClick(item) {
    if (item.classList.contains("win") || item.classList.contains("lose")) {
      return; // Prevent clicking the same box multiple times
    }

    const isWin = Math.random() > 0.5; // Random win or lose
    if (isWin) {
      const winAmount = Math.floor(Math.random() * 100) + 1; // Random win amount between 1 and 100
      item.classList.add("win");
      item.textContent = `Win: $${winAmount}`;
      pendingWinnings += winAmount; // Add to pending winnings
    } else {
      item.classList.add("lose");
      item.textContent = "Lose";
    }
  }

  // Bet button interaction
  document.getElementById("bet-btn").addEventListener("click", function () {
    alert("Bet placed!");
    startTimer(); // Start countdown timer when betting
  });

  // Reshuffle button interaction
  document
    .getElementById("reshuffle-btn")
    .addEventListener("click", function () {
      alert("Board reshuffled!");
      resetGrid();
    });

  // Cash-in button interaction
  document.getElementById("cashin-btn").addEventListener("click", function () {
    if (pendingWinnings > 0) {
      fakeWallet.updateBalance(pendingWinnings); // Add pending winnings to wallet
      alert(`You've cashed in $${pendingWinnings}!`);
      pendingWinnings = 0; // Reset winnings after cashing in
      resetTimer(); // Reset timer after cashing in
    } else {
      alert("No winnings to cash in!");
    }
  });

  // Cash-out button interaction
  document.getElementById("cashout-btn").addEventListener("click", function () {
    if (fakeWallet.balance > 0) {
      fakeWallet.cashOut(); // Cash out all money from wallet
    } else {
      alert("No balance to cash out!");
    }
  });

  // Add money to wallet interaction
  document
    .getElementById("add-money-btn")
    .addEventListener("click", function () {
      const addAmount = parseInt(document.getElementById("add-money").value);
      if (addAmount > 0) {
        fakeWallet.updateBalance(addAmount);
        alert(`$${addAmount} has been added to your wallet!`);
        document.getElementById("add-money").value = ""; // Clear input field after adding money
      } else {
        alert("Please enter a valid amount to add.");
      }
    });

  // Start the countdown timer
  function startTimer() {
    resetTimer(); // Reset timer if already running
    timeLeft = 30; // Reset the timer to 30 seconds
    document.getElementById("timer").innerText = timeLeft; // Display initial time
    timerInterval = setInterval(() => {
      timeLeft--;
      document.getElementById("timer").innerText = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        alert("Time is up! You lost your winnings.");
        pendingWinnings = 0; // Reset winnings when time runs out
        resetGrid(); // Reset the grid
      }
    }, 1000); // Update every second
  }

  // Reset the countdown timer
  function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById("timer").innerText = "30";
  }

  function resetGrid() {
    const gridItems = document.querySelectorAll(".grid-item");
    gridItems.forEach((item) => {
      item.classList.remove("win", "lose");
      item.textContent = "";
    });
  }
});
