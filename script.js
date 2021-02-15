class TriviaGame {
  constructor () {
    this.correctAnswers = 0
    this.incorrectAnswers = 0
    this.lengthOfGame = 10 //change this for a longer/shorter game //TO RENAME
    this.questionsPlayed = this.lengthOfGame
    this.questionBase = questionCollection
    this.correctPercentage = 0
    this.evaluation = ""
  }
  shuffleQuestions() {
    return this.questionBase.sort(() => Math.random() - 0.5)
  }
  shuffleAnswers(arr) {
    return arr.sort(() => Math.random() - 0.5)
  }
  pullQuestion() {
    let question = this.questionBase.pop()
    console.log(this.questionBase.length)
    this.shuffleAnswers(question.answers)
    return question
  }
  saveInput(iscorrect) {
    this.questionsPlayed --
    iscorrect? this.correctAnswers++ : this.incorrectAnswers ++
    console.log(this.questionsPlayed, this.correctAnswers, this.incorrectAnswers)
  }
  calculateResult() {
    this.correctPercentage = Math.floor(this.correctAnswers/(this.correctAnswers + this.incorrectAnswers)*100)
  }
  addEvaluation() {
    if (this.correctPercentage < 40) {
      this.evaluation = "This didn't go so well..."
    }
    else if (40 <= this.correctPercentage  && this.correctPercentage < 80) {
      this.evaluation = "Quite good. But do better next time ;)"
    }
    else {
      this.evaluation = "Great work"
    }
  }
  checkEnoughQestions() {
    console.log(this.questionBase.length, this.lengthOfGame)
    return this.questionBase.length >= this.lengthOfGame? true: false
  }
  checkEndOfGame() {
    let endOfGame = this.questionsPlayed <= 0? true: false
    return endOfGame
  }
  resetGame() {
    this.questionsPlayed = this.lengthOfGame
    this.correctAnswers = 0
    this.incorrectAnswers = 0
  }
}

const triviaGame = new TriviaGame()

//INITIALIZE TEXTS AND BUTTONS

const startButton = document.getElementById('start-btn')
const reStartButton = document.getElementById('restart-btn')
const nextButton = document.getElementById('next-btn')
const optionButtons = document.querySelectorAll('.btn')
const questionTextElement = document.getElementById('question')
const percentageElement = document.getElementById('result-percentage')
const endTextElement = document.getElementById('end-message')

const questionPage = document.getElementById('question-container')
const introPage = document.getElementById('intro-container')
const endPage = document.getElementById('end-screen-container')
const noMorePage = document.getElementById('no-more-container')

//INITIALIZE SCREENS

let currentQuestion
let currectSolution

const questionScreen = () => {
  currentQuestion = triviaGame.pullQuestion()
  questionTextElement.innerText = currentQuestion.questionText
  optionButtons.forEach((button, i=0) => {
    button.classList.remove('correct-answer')
    button.classList.remove('wrong-answer')
    button.innerText = currentQuestion.answers[i].text
    if (currentQuestion.answers[i].correct) {
      currentSolution = currentQuestion.answers[i].text
    }
    i++})
  questionPage.classList.remove('hide')
  endPage.classList.add('hide')
  }

const endScreen = () => {
  triviaGame.calculateResult()
  triviaGame.addEvaluation()
  questionPage.classList.add('hide')
  endPage.classList.remove('hide')
  endTextElement.innerText = triviaGame.evaluation
  percentageElement.innerText = triviaGame.correctPercentage.toString() + "%"
}

const noMoreQuestionsScreen = () => {
  introPage.classList.add('hide')
  questionPage.classList.add('hide')
  endPage.classList.add('hide')
  noMorePage.classList.remove('hide')
}

//INITIALIZE EVENTS

startButton.addEventListener('click', button => {
  triviaGame.shuffleQuestions()
  questionScreen()
  introPage.classList.add('hide')
  questionPage.classList.remove('hide')
} )

optionButtons.forEach(button => {
  button.addEventListener('click', () => {
    console.log(currentSolution)
    console.log(button.innerText === currentSolution)
    button.innerText === currentSolution?
    button.classList.add('correct-answer'): button.classList.add('wrong-answer')
    triviaGame.saveInput(button.innerText === currentSolution)
    nextButton.classList.remove('hide')
  } )
})

nextButton.addEventListener('click', button => {
  triviaGame.checkEndOfGame()? endScreen() : questionScreen()
  nextButton.classList.add('hide')
})

reStartButton.addEventListener('click', button => {
  triviaGame.resetGame()
  triviaGame.checkEnoughQestions()?  questionScreen() : noMoreQuestionsScreen()
})
