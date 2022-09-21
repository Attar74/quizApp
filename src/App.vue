<template>
  <div>
    <div class="ctr d-flex height-80 align-center">
      <div class='mx-auto' v-if="isPageLoading">
        <v-progress-circular
          v-if="isPageLoading"
          indeterminate
          :size="70"
          :width="7"
          color="#00ca8c"
          class="mx-auto"
        ></v-progress-circular>   
      </div>   
      <div v-else>
        <!--Questions Component-->
        <transition-group name="fade" mode="out-in">    
          <Questions v-if='stilInQuestionPhase' 
            :questions='questions' 
            :questionsAnswered='questionsAnswered'       
            @question-answered="questionAnswered($event)"
          />
        
          <!--Results Component-->    
          <Results v-else
            :questionsLength='questions.length'
            :totalCorrect="totalCorrect"
          />
        </transition-group> 
      
        <!--Action Button-->
        <button v-if='questionsAnswered>=questions.length&&!isPageLoading' type="button" class="reset-btn" @click.prevent="resetQuestions">Reset</button>
      </div>
    </div>
    <mainFooter />
  </div>
</template>


<script>
import {questionsService} from '@/services/questions.service.js'
import Questions from './components/Questions.vue';
import Results from './components/Results.vue';
import mainFooter from './components/mainFooter.vue';
  export default {
    name: "App",
    components: { Questions, Results, mainFooter },    
    data() {
      return {
        isPageLoading: true,
        totalCorrect: 0,
        questionsAnswered: 0,
        questions: []
      }
    },
    computed: {
      //Check if Questions ansered is less than all questions
      stilInQuestionPhase() {
        return this.questionsAnswered < this.questions.length
      }
    },
    methods: {
      questionAnswered(is_correct) {
        if(is_correct) this.totalCorrect++
        this.questionsAnswered++
      },
      resetQuestions() {
        this.totalCorrect = 0
        this.questionsAnswered=0
      },
      async getQuestions() {
        try {
          const response = await questionsService.getQuestions()
          response.data.results.map((q)=>{
            const answers = []
            q.incorrect_answers.map((in_answer)=>{
              const answer = {
                text: in_answer,
                is_correct: false
              }
              answers.push(answer)
            })
            const correct_answer = {
              text: q.correct_answer,
              is_correct: true
            }
            const question = {
              questionTitle: q.question,
              answers: this.mixArrayElements([...answers, correct_answer]),              
              correct_answer: q.correct_answer
            }
            this.questions.push(question)
            this.isPageLoading = false
          })
        } catch(error) {
          console.log(error)
        }
      },
      mixArrayElements(arr) {        
        let currentIndex = arr.length,  randomIndex;
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [arr[currentIndex], arr[randomIndex]] = [
            arr[randomIndex], arr[currentIndex]];
        }
        return arr
      }
    },
    created() {
      this.getQuestions()
    }
  }
</script>

<style>
@import url('./assets/main.css');
.height-80{
  height: 80vh;
}
</style>