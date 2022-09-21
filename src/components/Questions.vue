<template>
  <div class="questions-ctr">
        <div class="progress">
            <div class="bar" :style="{ width: `${(questionsAnswered/questions.length) *100}%` }"></div>
            <div class="status">
                {{ questionsAnswered }} out of {{questions.length}} questions answered
            </div>
        </div>
        <transition-group name="fade">
            <div class="single-question"
                v-for="(question, i) in questions" 
                :key="i" 
                v-show="questionsAnswered==i"
            >
                <div class="question">{{question.questionTitle}}</div>
                <div class="answers">
                    <div                     
                        class="answer" 
                        v-for="(answer,j) in question.answers" 
                        :key="j"
                        @click.prevent='selectAnswer(answer.is_correct)' 
                    >
                        {{answer.text}}
                    </div>                
                </div>
            </div>
        </transition-group>        
    </div>
</template>

<script>
export default {
    props: {
        questions: {
            default: [],
            required: true
        },
        questionsAnswered: {
            default: 0,
            required: true
        }
    },
    emits: ['questionsAnswered', 'question-answered'],
    methods: {
        selectAnswer(is_correct) {
            this.$emit('question-answered', is_correct)            
        }
    }

}
</script>