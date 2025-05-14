document.addEventListener('DOMContentLoaded', function() {
    const template = document.getElementById('question-template');
    const list = document.getElementById('list');
    const submitBtn = document.getElementById('check-answer');
    const inputAnswer = document.getElementById('input-answer');
    const resultDiv = document.getElementById('result');
    let questions = [
        {   "id":1,
            "title":"",
            "decsription":"",
        }
    ];


    async function fetchQuestions() {
        try {
            const response = await fetch('https://your-api-endpoint.com/questions');
            if (!response.ok) throw new Error('Ошибка загрузки вопросов');
            questions = await response.json();
        } catch (error) {
            console.error('Error:', error);
            resultDiv.textContent = 'Не удалось загрузить вопросы.';
        }
    }


    

    function checkAnswers() {
        let correct = document.querySelectorAll(".correct").length;
        
        resultDiv.innerHTML = `Правильных ответов: <b>${correct}</b> из ${questions.length}`;
    }

    fetchQuestions();

    questions.forEach(q=>{

        template.children[0].children[0].textContent = q.title;
        template.children[0].children[1].textContent = q.decsription;

        let clone = template.cloneNode(true);

        clone.children[1].children[1].addEventListener("click", () => {
            if (clone.children[1].children[0].value.toLowerCase().trim() == q.answer.toLowerCase().trim()) {
                inputAnswer.style.color = "green";
                submitBtn.style.color = "green";
            }
            else
            {
                inputAnswer.style.color = "red";
                submitBtn.style.color = "red";
            }
        })

    })

    submitBtn.addEventListener('click', checkAnswers);

});       


