const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will build an understanding of object-oriented programming concepts using Python.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands-on with students building basic sites using HTML and CSS.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students deepen their understanding of programming concepts while learning to write functions, organize code into modules, use exceptions, and write unit tests.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the concepts of object-oriented programming using C#. Students will design, build, test, and implement classes and methods.',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior Web Fundamentals knowledge by introducing more advanced CSS and JavaScript. Students will build dynamic web pages.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Web Frontend Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course focuses on user experience, accessibility, compliance, mobile-first design, browser APIs, and JSON data integration.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

const courseContainer = document.querySelector('#course-container');
const totalCreditsDisplay = document.querySelector('#total-credits');
const btnAll = document.querySelector('#all-courses');
const btnWdd = document.querySelector('#wdd-courses');
const btnCse = document.querySelector('#cse-courses');

function displayCourses(filteredCourses) {
    courseContainer.innerHTML = '';
    
    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card');
        card.classList.add(course.completed ? 'completed' : 'pending');
        
        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
        `;
        courseContainer.appendChild(card);
    });

    // Calculate total credits using reduce()
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsDisplay.textContent = `Total Credits Required/Displayed: ${totalCredits}`;
}

// Event Listeners for Filters
btnAll.addEventListener('click', () => displayCourses(courses));
btnWdd.addEventListener('click', () => displayCourses(courses.filter(c => c.subject === 'WDD')));
btnCse.addEventListener('click', () => displayCourses(courses.filter(c => c.subject === 'CSE')));

// Initial Render
displayCourses(courses);