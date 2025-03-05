// Get references to HTML elements
const clubList = document.getElementById('club-list');
const searchInput = document.getElementById('search');
const clubDetailsContainer = document.getElementById('main');

// Attach an input event listener for the search input
searchInput.addEventListener('input', handleSearchInput);


// Initialize football club data and display all clubs
let clubData = footballClubs; // We have a football clubs array here
displayClubs(clubData); // Display the full list initially


// Display football clubs in the club list
function displayClubs(clubs) {
    // Generate HTML for club cards and set it in the clubList element
    const clubCardsHTML = clubs.map(createClubCardHTML).join('');
    clubList.innerHTML = clubCardsHTML; // This will display the club cards
}

// Create HTML for a football club card
function createClubCardHTML(club) {
    return `
        <div class="club-card" onclick="handleClubClick(this);"><!-- Add onclick event -->
            <h2>${club.name}</h2>
            <img src="${club.image}" alt="${club.name} Image" style="width:100%; height:20vh;">
            <p><b>League: </b>${club.league}</p>
            <p><b>City: </b>${club.city}</p>
            <button onclick="viewClubPlayers('${club.name}'); event.stopPropagation();" style="width:100%;">View Players</button>
        </div>
    `;
}



// Handle clicking on a football club card
function handleClubClick(element) {
    // Write your code here for task1

    // Get the club name from the clicked card element
    const clubName = element.querySelector('h2').textContent; // Get the name of the clicked club

        // Find the selected club in the clubData array
        const selectedClub = clubData.find(club => club.title === clubName);
    

        // If the selected club is found, display its details
        if (selectedClub) {
            displayClubDetails(selectedClub);
            // Show the details of the selected club
        }

       
}

// Display football club details
// Function to display football club details on the page
function displayClubDetails(club) {
   // Write your code here for task2

    // Generate HTML for the club details, including the Back button, club information, and the View Players button
    const clubDetailsHTML = `
    <div class="club-details"> 
    <!-- Container for club details -->

    <button onclick="goBack;" class = "back-button>Back</button>
      <!-- Back button to return to the club list -->

            <!-- Display the club name as a heading -->
            <h2>${club.name}</h2>

            <!-- Display the club's logo image, with a fixed width and auto height to maintain aspect ratio -->
            <img src="${club.image}" alt="${club.name} Image" style="width:100%; height:20vh;">

            <!-- Display the club's league -->
            <p><b>League:</b> ${club.league}</p>

            <!-- Display the club's city -->
            <p><b>City:</b> ${club.city}</p>

            <!-- Display the club's stadium name -->
            <p><b>Stadium:</b> ${club.stadium}</p>

            <!-- Display a description of the club -->
            <p>Description: ${club.description}</p>

            <!-- Button to view the players of the club; calls viewClubPlayers function on click -->
            <button onclick="viewClubPlayers('${club.name}');" class = "view-players-button>View Players</button>

        </div>
    `;
    // Update the content of the clubDetailsContainer element with the generated HTML
    clubDetailsContainer.innerHTML = clubDetailsHTML;
    clubList.style.display = 'none'; // Hide the club list when details are shown
}

// Function to go back to the home page (club list)
function goBack() {
    // Navigate back to the main page (e.g., index.html or reload the current page)
    window.location.href = './index.html'; 
}



// Function to view club players
function viewClubPlayers(clubName) {
   // Write your code here for task3

   // Find the club in the clubData array by matching the club name
   const selectedClub = clubData.find(club => club.name === clubName);

   if (selectedClub) {

       // Create HTML to display the club's players
       const playersHTML = selectedClub.players.map(player => {
           return `
               <div class="player-card">
                   <h3>${player.name}</h3>
                   <p><b>Position:</b> ${player.position}</p>
                   <p><b>Age:</b> ${player.age}</p>
                   <p><b>Nationality:</b> ${player.nationality}</p>
                   <img src="${player.image}" alt="${player.name}" style="width:100px; height:auto;">
               </div>
           `;
       }).join('');

       // Combine the players HTML with the back button and club name
       const clubPlayersHTML = `
           <button onclick="goBack()" class="back-button">Back</button>
           <h2>Players of ${selectedClub.name}</h2>
           <div class="players-list">
               ${playersHTML}
           </div>
       `;

       // Update the clubDetailsContainer to show players information
       clubDetailsContainer.innerHTML = clubPlayersHTML;
   }
}


// Handle search input and filter clubs
function handleSearchInput() {
    // Write your code here for task4
    const searchTerm = searchInput.value.toLowerCase();

    const filteredClubs = clubData.filter(club => {
        // Creating the string that contains the club's details for searching
        
        const clubDataString = `${club.name} ${club.league} ${club.city} ${club.description} ${club.stadium}`.toLocaleLowerCase();

        // Return true if the search term is found in the club data string
        return clubDataString.includes(searchTerm);
    });
    displayClubs(filteredClubs); 
    // Display the filtered clubs

}