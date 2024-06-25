let currentQuestion = 1;
const totalQuestions = 4;

function nextQuestion() {
    if (currentQuestion < totalQuestions) {
        document.getElementById(`question${currentQuestion}`).classList.remove('active');
        currentQuestion++;
        document.getElementById(`question${currentQuestion}`).classList.add('active');
    }
}

function prevQuestion() {
    if (currentQuestion > 1) {
        document.getElementById(`question${currentQuestion}`).classList.remove('active');
        currentQuestion--;
        document.getElementById(`question${currentQuestion}`).classList.add('active');
    }
}

function submitForm() {
    const questions = document.querySelectorAll('.question-section');
    const qaPairs = [];

    questions.forEach((question) => {
    const questionText = question.querySelector('h2').textContent;
    const answerInput = question.querySelector('input[type="text"]').value;
    qaPairs.push({ question: questionText, answer: answerInput });
    });

const jsonAnswers = JSON.stringify({ qaPairs });
console.log(jsonAnswers);


        $.ajax({
            url: 'http://localhost:3000/get-gptResponse',
            type: 'POST',
            contentType: 'application/json',
            data: jsonAnswers, 
            success: function(response) {
                console.log(response);
                $("#gptResponse").text(response.message); 
                window.location.href = `journey.html?response=${encodeURIComponent(response)}`;
            },
            error: function(xhr, status, error) {
                console.error("Error: " + status + " " + error);
            }
        });
}
