import { defineStore } from 'pinia'
import { ref } from 'vue';


export const useKnightStore =defineStore('knight',()=>{
    const knightRow=ref(0);
    const knightCol=ref(0);

    const moveKnight=(newRow, newCol)=>{
        knightRow.value=newRow;
        knightCol.value=newCol
    }
    return { knightRow, knightCol, moveKnight };
})
