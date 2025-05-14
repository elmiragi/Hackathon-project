document.addEventListener('DOMContentLoaded', () => {

    const questions = [
        "Как называется первый искусственный спутник Земли?",
        "Кто изобрел лампочку накаливания?",
        "Какая планета самая горячая в Солнечной системе?",
        "Какой газ чаще всего встречается в атмосфере Земли?",
        "Какой язык программирования назван в честь комедийного шоу?",
        "Кто считается отцом современной компьютеры?"
    ];

    const totalQuestions = 13; 


    const questionsListElement = document.getElementById('questions-list');
    if (questionsListElement) {
        questions.forEach((questionText, index) => {
            const questionItem = document.createElement('div');
            questionItem.classList.add('question-item');

            const questionNumber = index + 1;
            const questionContent = document.createElement('p');
            questionContent.classList.add('question-text');
            questionContent.textContent = $;{questionNumber}{questionText};

            questionItem.appendChild(questionContent);
            questionsListElement.appendChild(questionItem);
        });
    } else {
        console.error("Элемент #questions-list не найден!");
    }

     const quizProgressElement = document.querySelector('.quiz-progress');
     if (quizProgressElement) {
    
         quizProgressElement.textContent = 0/$;{totalQuestions}; 
     }


    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;
    const themeKey = 'bhunters-theme'; 

    function applyTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light-theme');
            themeSwitch.checked = true;
        } else {
            body.classList.remove('light-theme');
            themeSwitch.checked = false;
        }
    }

    const savedTheme = localStorage.getItem(themeKey);
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme('dark');
    }

    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            applyTheme('light');
            localStorage.setItem(themeKey, 'light');
        } else {
            applyTheme('dark');
            localStorage.setItem(themeKey, 'dark');
        }
    });

});