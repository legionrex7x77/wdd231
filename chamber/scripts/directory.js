const membersContainer = document.querySelector('#members-container');
const gridButton = document.querySelector('#grid-view');
const listButton = document.querySelector('#list-view');

async function getMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    console.error('Error fetching chamber member data:', error);
    membersContainer.innerHTML = '<p class="error">Failed to load directory data. Please try again later.</p>';
  }
}

function displayMembers(members) {
  membersContainer.innerHTML = ''; // Clear container

  members.forEach((member) => {
    const card = document.createElement('section');
    card.classList.add('member-card');

    card.innerHTML = `
      <img src="${member.image}" alt="${member.name} logo" loading="lazy" width="180" height="100">
      <div class="member-info">
        <h3>${member.name}</h3>
        <p class="category">${member.category}</p>
        <p class="badge level-${member.membershipLevel}">${member.membershipName}</p>
        <p class="address">${member.address}</p>
        <p class="phone">${member.phone}</p>
        <p class="website"><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
      </div>
    `;

    membersContainer.appendChild(card);
  });
}

// Toggle Grid and List Views
gridButton.addEventListener('click', () => {
  membersContainer.classList.add('grid-view');
  membersContainer.classList.remove('list-view');
  gridButton.classList.add('active');
  listButton.classList.remove('active');
});

listButton.addEventListener('click', () => {
  membersContainer.classList.add('list-view');
  membersContainer.classList.remove('grid-view');
  listButton.classList.add('active');
  gridButton.classList.remove('active');
});

getMembers();