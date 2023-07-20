const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelected = document.getElementById("movie");

let ticketPrice = +movieSelected.value;

populateUI();

function setMovieData(movieIndex, moviePrice) {
  console.log("kk", movieIndex, moviePrice);
  localStorage.setItem("movieIndex", movieIndex);
  localStorage.setItem("ticketPrice", moviePrice);
}

function updateSelectionCount() {
  const seatSelected = document.querySelectorAll(".row .seat.selected");
  const seatsIndex = [...seatSelected].map(function (seat) {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem("seatSelected", JSON.stringify(seatsIndex));

  const selectedSeats = seatSelected.length;
  count.innerHTML = selectedSeats;
  total.innerHTML = ticketPrice * selectedSeats;
}

// Get data from localStorage and populate UI

function populateUI() {
  const movieIndex = localStorage.getItem("movieIndex");
  const ticketPrice = localStorage.getItem("ticketPrice");
  const seatSelected = localStorage.getItem("seatSelected");

  if (movieIndex) {
    movieSelected.selectedIndex = movieIndex;
    setMovieData(movieIndex, ticketPrice);
  }

  if (seatSelected) {
    const seatsIndex = JSON.parse(seatSelected);
    seats.forEach((seat, index) => {
      if (seatsIndex.includes(index)) {
        seat.classList.add("selected");
      }
    });
  }
  updateSelectionCount();
}
movieSelected.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectionCount();
});
container.addEventListener("click", (e) => {
  console.log(e.target);
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectionCount();
  }
});
