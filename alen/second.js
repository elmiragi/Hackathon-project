function $(id) {
    return document.getElementById(id);
}


const list = $("questions-list");

const templates = {
    ny: $("template-ny"),
    input: $("template-input"),
    radioBtnes: $("template-radioBtnes"),
    checkBoxes: $("template-checkBoxes"),
    radioBtn: $("template-radioBtn"),
    checkBox: $("template-checkBox"),
}

templates.ny.remove();
templates.input.remove();
templates.radioBtnes.remove();
templates.checkBoxes.remove();
templates.radioBtn.remove();
templates.checkBox.remove();

templates.ny.removeAttribute("id");
templates.input.removeAttribute("id");
templates.radioBtnes.removeAttribute("id");
templates.checkBoxes.removeAttribute("id");
templates.radioBtn.removeAttribute("id");
templates.checkBox.removeAttribute("id");

// const results = [$("exit"), $("blocks")];
const result = $("end");


const host = "https";
const domain = "team-3.internship.api.visiflow-ai.ru";


fetch(`${host}://${domain}/questions`)
    .then((response) => { return response.json() })
    .then((data) => {


        data.questions.forEach(question => {

            // if (question.type != 0) return;

            let clone, variants;

            switch (question.type) {
                case 0:


                    clone = templates.ny.cloneNode(true);
                    clone.answer = question.answer.toLowerCase();

                    clone.children[1].onclick = () => {
                        clone.children[1].disabled = true;
                        clone.children[2].disabled = false;
                        clone.data = "да";
                    }

                    clone.children[2].onclick = () => {
                        clone.children[2].disabled = true;
                        clone.children[1].disabled = false;
                        clone.data = "нет";
                    }


                    break;

                case 1:

                    clone = templates.input.cloneNode(true);
                    clone.answer = question.answer.toLowerCase();

                    clone.children[1].addEventListener('input', function (e) {
                        clone.data = e.target.value.toLowerCase()
                    });

                    break;


                case 2:

                    clone = templates.radioBtnes.cloneNode(true);
                    clone.answer = question.answer;

                    variants = [...question.variantes.split(' '), question.answer]

                    templates.radioBtn.children[0].name = `radioBtn-${question.id}`
                    for (let variant of variants) {
                        templates.radioBtn.children[0].value = variant;
                        templates.radioBtn.children[2].textContent = variant;
                        clone.children[1].append(templates.radioBtn.cloneNode(true));
                    }

                    break;

                case 3:

                    clone = templates.checkBoxes.cloneNode(true)
                    clone.answer = question.answer.split(' ');

                    variants = [...question.variantes.split(' '), ...clone.answer]

                    templates.checkBox.children[0].name = `checkBox-${question.id}`

                    for (let variant of variants) {
                        templates.checkBox.children[0].value = variant;
                        templates.checkBox.children[2].textContent = variant;
                        clone.children[1].append(templates.checkBox.cloneNode(true));
                    }


                    break;

                default:
                    break;
            }

            clone.children[0].textContent = question.ask;



            list.append(clone);

        })
    })

    .then(() => {

        const checkBtn = $("check-answer");



        checkBtn.addEventListener("click", () => {

            let checks = document.querySelectorAll(".check");
            let values = document.querySelectorAll('input:checked ');

            values.forEach((el) => {
                el.parentNode.parentNode.parentNode.data = undefined;
            })

            values.forEach((el) => {
                let data = el.parentNode.parentNode.parentNode.data;

                if (data == undefined) {
                    el.parentNode.parentNode.parentNode.data = [el.value]
                }
                else {
                    el.parentNode.parentNode.parentNode.data =
                        [...data, el.value];
                }

            })

            for (let check of checks) {

                // console.log(check.answer, check.data);
                if (check.data == null || check.data === "") {
                    console.warn("Not good!");
                    return;
                }

            }


            let counter = 0

            checks.forEach((check) => {

                if (check.answer == check.data) {
                    counter += 1;
                    check.children[0].style.color = "green";
                }
                else if (Array.isArray(check.answer) && check.answer.join(" ") == check.data.join(" ")) {
                    counter += 1;
                    check.children[0].style.color = "green";
                }
                else check.children[0].style.color = "red";
                // console.log(check.answer, check.data, check.answer == check.data || check.answer.join(" ") == check.data.join(" "));
            })


            // results.forEach((result) => { result.classList.toggle("hidden") })

            result.children[0].innerHTML = `<span>${counter}</span>/${checks.length}`
            result.style.animationName = "show";
            result.style.display = "flex"


        })


    });



const counter = $("counter");
function checkCounter() {

    let checks = document.querySelectorAll(".check");
    let count = 0;

    checks.forEach((check) => {
        if (check.data != undefined) count++;
        
    })

    counter.textContent = `${count}/${checks.length}`

}

setInterval(checkCounter, 100);



