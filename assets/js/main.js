document.addEventListener('DOMContentLoaded', function () {
    (function () {
        const wrapperQuiz = document.querySelector(".js-quiz-wrapper");
        const quizButton = document.querySelector(".js-quiz-button");
        const state = {
            questions: null,
            conuter: 0,
        };
        const answersUser = {
            answers: [],
        };

        if (wrapperQuiz !== null && quizButton !== null) {

            function getData(data) {
                return data.questions = [
                    {
                        title: "Как вы относитесь к красному цвету?",
                        answer: {
                            one: "Положительно",
                            two: "Мой любимый цвет",
                            three: "Он мне не нравится",
                            four: "Нейтрально",
                        }
                    },
                    {
                        title: "Часто сидите за компьютером?",
                        answer: {
                            one: "Каждый день",
                            two: "Очень редко",
                            three: "У меня нет компьютера",
                            four: "Жить без него не могу",
                        }
                    },
                    {
                        title: "Сколько у вас домашних животных в доме?",
                        answer: {
                            one: "У меня их нет",
                            two: "Кот и собака",
                            three: "Только кот",
                            four: "У меня попугай и хомяк",
                        }
                    },
                    {
                        title: "Занимаетесь вы спортом?",
                        answer: {
                            one: "Да",
                            two: "Нет",
                            three: "Не могу без него",
                            four: "Хочу начать",
                        }
                    },
                    {
                        title: "Любите много кушать?",
                        answer: {
                            one: "Да",
                            two: "Я на диете",
                            three: "А чем еще заниматься",
                            four: "Питаюсь воздухом",
                        }
                    },
                ]
            }
            getData(state);

            function renderCardQuiz(wrapper, { conuter, questions }) {
                let { title, answer: { one, two, three, four } } = questions[conuter];
                removeNodeElement(wrapper);
                let cardQuiz = `
            <div class="quiz-main__card js-quiz-card">
            <div class="quiz-main__top">
                <h2 class="quiz-main__title">${title ?? "-"}</h2>
            </div>
            <ul class="quiz-main__list">
                <li class="quiz-main__item">
                    <input name="radio" class="quiz-main__input" type="radio">
                    <button class="quiz-main__btn">
                    ${one ?? "-"}
                    </button>
                </li>
                <li class="quiz-main__item">
                    <input name="radio" class="quiz-main__input" type="radio">
                    <button class="quiz-main__btn">
                    ${two ?? "-"}
                    </button>
                </li>
                <li class="quiz-main__item">
                    <input name="radio" class="quiz-main__input" type="radio">
                    <button class="quiz-main__btn">
                    ${three ?? "-"}
                    </button>
                </li>
                <li class="quiz-main__item">
                    <input name="radio" class="quiz-main__input" type="radio">
                    <button class="quiz-main__btn">
                    ${four ?? "-"}
                    </button>
                </li>
            </ul>
            </div>
            `
                wrapper.insertAdjacentHTML("beforeend", cardQuiz);
            }

            function removeNodeElement(nodeElement) {
                nodeElement.querySelector(".js-quiz-card") ? nodeElement.querySelector(".js-quiz-card").remove() : null;
            }

            function addFieldAnswer(arrayAnswersUser, wrapper) {
                if (!wrapper.querySelector(".quiz-main__input")) return;
                let answer = wrapper.querySelector(".quiz-main__input:checked~.quiz-main__btn");
                let title = wrapper.querySelector(".quiz-main__title");
                let checkedAnswer = {
                    answer: answer ? answer.innerText : null,
                    title: title ? title.innerText : null,
                }
                arrayAnswersUser.answers.push(checkedAnswer);
                console.log(arrayAnswersUser);
            }

            function activeUserNotificationWindow(wrapper) {
                removeNodeElement(wrapperQuiz)
                let dataText = `
                <span>Ваши ответы отправлены на рассмотрение</span>
                `
                wrapper.insertAdjacentHTML("beforeend", dataText);
            }

            function buttonActionQuestion(numberQuestion, button) {
                if (numberQuestion.conuter >= state.questions.length - 1) {
                    addFieldAnswer(answersUser, wrapperQuiz);
                    activeUserNotificationWindow(wrapperQuiz);
                    button.remove();
                    return
                }
                addFieldAnswer(answersUser, wrapperQuiz);
                numberQuestion.conuter += 1;
                renderCardQuiz(wrapperQuiz, state);
            }

            quizButton.addEventListener("click", () => {
                buttonActionQuestion(state, quizButton)
            });

            renderCardQuiz(wrapperQuiz, state);
        }
    })()
});