import axios from 'axios'

const ApiUrl = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple'
export const questionsService = {
    getQuestions
}

function getQuestions() {
    return axios.get(ApiUrl)
}