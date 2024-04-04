<template>
    
</template>
<script   setup >
import promosStore from '@/stores/promosStore.js'
import { onMounted  } from 'vue'

const promos = []
const promostore = promosStore()

onMounted( ()=>{
    promostore.getPromos()
}
  )



</script>