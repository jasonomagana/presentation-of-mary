const schedules = document.getElementById('schedule-container');
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu-items');
const openIcon = document.querySelector('.menu-open-icon');
const navLinks = document.querySelector('.mobile-menu-list');
const navItems = navLinks.querySelectorAll('a');

navItems.forEach((link) => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    })
});

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

let lastScroll = 0;

window.addEventListener('scroll', () => {
    let currentScroll = window.scrollY;

    if (currentScroll === 0) {
        navbar.classList.remove('hide-navbar');
        navbar.classList.remove('scroll');
    } else if (currentScroll > lastScroll) {
        navbar.classList.add('hide-navbar');
        navbar.classList.remove('scroll');
    } else {
        navbar.classList.remove('hide-navbar');
        navbar.classList.add('scroll');
    }

    lastScroll = currentScroll;
})


function getSchedule() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', './schedule.json');

    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.responseText);
            
            data.forEach((day) => {
                const dayDiv = document.createElement('div');
                dayDiv.className = 'day';

                const eventDay = document.createElement('h3');
                eventDay.className = 'day-heading';
                eventDay.textContent = `${day.day}`;

                const eventDate = document.createElement('h3');
                eventDate.className = 'date-heading';
                eventDate.textContent = `${day.date}`;

                dayDiv.appendChild(eventDay);
                dayDiv.appendChild(eventDate);

        day.events.forEach((event) => {
                    const eventDiv = document.createElement('div');
                    eventDiv.className = 'event';

                    const eventTime = document.createElement('p');
                    eventTime.textContent = `${event.time}`;

                    const eventTitle = document.createElement('p');
                    eventTitle.textContent = event.title;

                    eventDiv.appendChild(eventTime);
                    eventDiv.appendChild(eventTitle);

                    dayDiv.appendChild(eventDiv);
                })

                schedules.appendChild(dayDiv);
            })
        }

    }

    xhr.send();
}

getSchedule();