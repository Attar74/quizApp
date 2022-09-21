<template>
  <div>
    <div class="result">        
        <div class="title">
            {{results[resultIndex].title}}!
            your results is {{totalCorrect}}!
        </div>
        <div class="desc">
            {{results[resultIndex].desc}}
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        results: {
            default: [],
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
        resultIndex() {
            let index=0
            this.results.map((result, i)=>{
                if(this.betweenRange(this.totalCorrect,result.min,result.max)){
                    index = i
                }
            })
            return index
        }
    }
}
</script>