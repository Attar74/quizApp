<template>
  <div>
    <div class="result">        
        <div class="title">
            {{getFinalText.title}}
            You Have answered 
            {{ totalCorrect }} 
            questions correctly out of 
            {{ questionsLength }}            
        </div>
        <div class="desc">
            {{getFinalText.desc}}
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        questionsLength: {
            default: 0,
            required: true
        },
        totalCorrect: {
            default: 0,
            required: true
        }
    },
    methods: {
        betweenRange(x, min, max) {
            return x >= min && x <= max
        }        
    },
    computed: {
        getTotalCorrectPercentage() {
            return (this.totalCorrect/this.questionsLength)*100
        },
        getFinalText() {
            if (this.getTotalCorrectPercentage < 60) return {
                title: "Try again!",
                desc: "Do a little more studying and you may succeed!"
            }
            else return {
                title: "Wow, you're a genius!",
                desc: "Studying has definitely paid off for you!"
            }
        }
    }
}
</script>