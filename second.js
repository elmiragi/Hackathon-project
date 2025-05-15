document.addEventListener('DOMContentLoaded', function() {
    const template = document.getElementById('question-template');
    const list = document.getElementById('list');
    const submitBtn = document.getElementById('check-answer');
    const inputAnswer = document.getElementById('input-answer');
    const resultDiv = document.getElementById('result');
    // let questions;
    // [
    //     {
    //         "id": 1,
    //         "title": "Вопрос типа Да/Нет",
    //         "description": "Правда ли, что хамелеоны меняют цвет для маскировки?",
    //         "answer": "нет",
    //         "type": "yesno"
    //     },
    //     {
    //         "id": 2,
    //         "title": "Вопрос с собственным ответом",
    //         "description": "Кто изобрел лампочку накаливания?",
    //         "answer": "Эдисон",
    //         "type": "text"
    //     },
    //     {
    //         "id": 3,
    //         "title": "Вопрос с одним вариантом",
    //         "description": "Какой тег используется для подключения JavaScript?",
    //         "answer": "script",
    //         "variants": ["javascript", "script", "js", "scripting"],
    //         "type": "radio"
    //     },
    //     {
    //         "id": 4,
    //         "title": "Вопрос с несколькими вариантами",
    //         "description": "Какие из этих произведений написал Александр Пушкин?",
    //         "answer": ["Руслан и Людмила", "Евгений Онегин"],
    //         "variants": ["Евгений Онегин", "Война и мир", "Руслан и Людмила", "Преступление и наказание"],
    //         "type": "checkbox"
    //     }
    // ];
// let user ={name:"tihon"}
// fetch("link", {
//     method: "POST",
//     headers: {
//         "Content-Type":"application/json",
//     },
//     body:JSON.stringify(user)
// })

var questions = [];

    async function fetchQuestions() {
        try {
            const response = await fetch('https://team-3.internship.api.visiflow-ai.ru/questions');  // http://rusland.h1n.ru/questions.php
            // const response = await fetch('http://rusland.h1n.ru/questions.php');
            if (!response.ok) throw new Error('Ошибка загрузки вопросов');
            questions = await response.json();
            

            renderQuestions();
            
        } catch (error) {
            console.error('Error:', error);
            template.textContent = 'Не удалось загрузить вопросы.';
        }
    }


    function renderQuestions() {
        list.innerHTML = ''; 
        console.log(questions);
        
        
        for(let q of questions.questions) {
            // yn:0 text:1 radio:2 checkBox:3
            const clone = template.content.cloneNode(true);
            // const questionElement = clone.querySelector('.question');
            
            // questionElement.querySelector('.question-title').textContent = q.title;
            // questionElement.querySelector('.question-description').textContent = q.description;
            
            // const answerContainer = questionElement.querySelector('.answer-container');
            // answerContainer.innerHTML = ''; 
            let qest = clone.children[0];
            const questionElement = qest.children[0];
            const answerContainer = qest.children[2];

            questionElement.textContent = q.ask;

            if (q.type >= 2){
                q.variants = q.variantes.split();
                if (q.type == 3) q.answer = q.answer
            }
            
            switch(q.type) {
                // case 'yesno':
                //     answerContainer.innerHTML = `
                //         <button><input type="radio" name="answer-${q.id}" value="да"> Да</button>
                //         <button><input type="radio" name="answer-${q.id}" value="нет"> Нет</button>
                //     `;
                //     break;
                                case 0:
                    answerContainer.innerHTML = `
                        <div class="button-radio-group">
                        <label class="button-radio">
                            <input type="radio" name="answer-${q.id}" value="да" hidden>
                            <span>Да</span>
                        </label>
                        <label class="button-radio">
                            <input type="radio" name="answer-${q.id}" value="нет" hidden>
                            <span>Нет</span>
                        </label>
                        </div>
                    `;
                    break;
                    
                case 1:
                    answerContainer.innerHTML = `<input type="text" name="answer-${q.id}" placeholder="Введите ответ">`;
                    break;
                    
                case 2:
                    q.variants.forEach(variant => {
                        answerContainer.innerHTML += `
                            <label>
                                <input type="radio" name="answer-${q.id}" value="${variant}">
                                ${variant}
                            </label><br>
                        `;
                    });
                    break;
                    
                case 3:
                    // console.log(q.variants);
            
                    
                    q.variants.forEach(variant => {
                        answerContainer.innerHTML += `
                            <label>
                                <input type="checkbox" name="answer-${q.id}" value="${variant}">
                                ${variant}
                            </label><br>
                        `;
                    });
                    break;
            }
            
            list.appendChild(clone);
        };
    }

    function checkAnswers() {
        let correctCount = 0;
        
        questions.forEach(q => {
            const userAnswer = getUserAnswer(q);
            const isCorrect = checkAnswer(q, userAnswer);
            
            if (isCorrect) {
                correctCount++;
                markQuestionCorrect(q.id);
            } else {
                markQuestionIncorrect(q.id);
            }
        });
        
        resultDiv.innerHTML = `Правильных ответов: <b>${correctCount}</b> из ${questions.length}`;
    }
    
    function getUserAnswer(q) {
        switch(q.type) {
            case 'yesno':
            case 'radio':
                const radio = document.querySelector(`input[name="answer-${q.id}"]:checked`);
                return radio ? radio.value : null;
                
            case 'text':
                const textInput = document.querySelector(`input[name="answer-${q.id}"]`);
                return textInput ? textInput.value.toLowerCase().trim() : '';
                
            case 'checkbox':
                const checkboxes = document.querySelectorAll(`input[name="answer-${q.id}"]:checked`);
                return Array.from(checkboxes).map(cb => cb.value);
        }
    }
    
    function checkAnswer(q, userAnswer) {
        if (!userAnswer) return false;
        
        switch(q.type) {
            case 'yesno':
            case 'text':
            case 'radio':
                return userAnswer.toLowerCase() === q.answer.toLowerCase();
                
            case 'checkbox':
                if (userAnswer.length !== q.answer.length) return false;
                return q.answer.every(ans => 
                    userAnswer.some(ua => ua.toLowerCase() === ans.toLowerCase())
                );
        }
    }
    
    function markQuestionCorrect(questionId) {
        const questionElement = document.querySelector(`.question[data-id="${questionId}"]`);
        if (questionElement) {
            questionElement.classList.add('correct');
            questionElement.classList.remove('incorrect');
        }
    }
    
    function markQuestionIncorrect(questionId) {
        const questionElement = document.querySelector(`.question[data-id="${questionId}"]`);
        if (questionElement) {
            questionElement.classList.add('incorrect');
            questionElement.classList.remove('correct');
        }
    }

    fetchQuestions();
    
    submitBtn.addEventListener('click', checkAnswers);
});
//     function checkAnswers() {
//         let correct = document.querySelectorAll(".correct").length;
        
//         resultDiv.innerHTML = `Правильных ответов: <b>${correct}</b> из ${questions.length}`;
//     }

//     fetchQuestions();

//     questions.forEach(q=>{

//         template.children[0].children[0].textContent = q.title;
//         template.children[0].children[1].textContent = q.decsription;

//         let clone = template.cloneNode(true);
//             })

//     submitBtn.addEventListener('click', checkAnswers);

// });     

        // clone.children[1].children[1].addEventListener("click", () => {
        //     if (clone.children[1].children[0].value.toLowerCase().trim() == q.answer.toLowerCase().trim()) {
        //         inputAnswer.style.color = "green";
        //         submitBtn.style.color = "green";
        //     }
        //     else
        //     {
        //         inputAnswer.style.color = "red";
        //         submitBtn.style.color = "red";
        //     }
        // })

  


