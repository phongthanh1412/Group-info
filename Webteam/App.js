document.addEventListener('DOMContentLoaded', () => {
    const backLink = document.querySelector('.back-link');
    if (backLink) {
        backLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const memberLinks = document.querySelectorAll('.member-link');
    const groupPhoto = document.getElementById('groupPhoto');
    const instruction = document.getElementById('instruction');
    const selectedMemberSpan = document.getElementById('selectedMember');
    let selectedMember = null;
    let firstClick = null;

    memberLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (e.ctrlKey) {
                e.preventDefault();
                memberLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                selectedMember = link.getAttribute('data-member');
                instruction.classList.remove('hidden');
                selectedMemberSpan.textContent = link.textContent.split('-')[0].trim();
            }
        });
    });

    groupPhoto.addEventListener('click', (e) => {
        if (!selectedMember) {
            return; 
        }

        e.preventDefault(); 
        const rect = groupPhoto.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (!firstClick) {
            firstClick = { x, y };
            alert(`First click recorded at (${x}, ${y}). Ctrl+click again to set the opposite corner.`);
        } else {
            const x1 = Math.min(firstClick.x, x);
            const y1 = Math.min(firstClick.y, y);
            const x2 = Math.max(firstClick.x, x);
            const y2 = Math.max(firstClick.y, y);

            const area = document.getElementById(`area-${selectedMember}`);
            area.coords = `${x1},${y1},${x2},${y2}`;
            console.log(`Updated coordinates for ${selectedMember}: ${x1},${y1},${x2},${y2}`);

            firstClick = null;
            selectedMember = null;
            instruction.classList.add('hidden');
            memberLinks.forEach(l => l.classList.remove('active'));
            alert(`Coordinates set for ${selectedMemberSpan.textContent}. Ctrl+click another member to continue.`);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('active'));

            card.classList.add('active');
        });
    });
});
