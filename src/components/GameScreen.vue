<template>
    <h1>Mã đi tuần {{ num }} x {{ num }}</h1>
    <div class="board"
        :style="{ display: 'grid', gridTemplateColumns: `repeat(${num}, 50px)`, gridTemplateRows: `repeat(${num}, 50px)` }"
        style="justify-content: center;">
        <div v-for="i in num * num" :key="i">
            <div :class="knightPass.includes(i) ? 'squarePass' : 'square'" @dragover.prevent
                @drop="goToSquare(Math.floor((i - 1) / num), (i - 1) % num, i)">

                <!-- Hiển thị con mã -->
                <div v-if="Math.floor((i - 1) / num) == knight.knightRow && (i - 1) % num == knight.knightCol"
                    style="position: absolute">
                    <img draggable="true" @dragstart="onDragStart"
                        style="height: 50px; width: 50px;border-bottom: 1.5px solid black;border-right: 1.5px solid black;"
                        src="../assets/DarkKnight.webp">
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useKnightStore } from '@/store/knight';

const route = useRoute();
const knight = useKnightStore();
const num = ref(0);
const knightPass = ref([])
let dragged = ref(null);

onMounted(async () => {
    if (route.params.id) {
        num.value = parseInt(route.params.id)
    }
    knight.moveKnight(0, 0)
    setKnightPass(1)

})
watch(
    () => route.params.id,
    (newVal) => {
        if (newVal) num.value = parseInt(newVal)
    },
    { immediate: true }
)
function goToSquare(rowNum, colNum, index) {
    if (((knight.knightRow + 2 == rowNum || knight.knightRow - 2 == rowNum) && (knight.knightCol + 1 == colNum || knight.knightCol - 1 == colNum) || (knight.knightRow + 1 == rowNum || knight.knightRow - 1 == rowNum) && (knight.knightCol + 2 == colNum || knight.knightCol - 2 == colNum)) && !knightPass.value.includes(index)) {
        knight.moveKnight(rowNum, colNum)
        setKnightPass(index)
    }
};

function setKnightPass(index) {
    knightPass.value.push(index)
    console.log(knightPass.value)
}


function onDragStart(e) {
  dragged.value = {
    row: knight.knightRow,
    col: knight.knightCol,
  };
}

function onDrop(newRow, newCol, index) {
  // Bạn có thể thêm điều kiện hợp lệ tại đây nếu muốn
  knight.moveKnight(newRow, newCol);
  setKnightPass(index);
}
</script>

<style scoped>
.square {
    height: 50px;
    width: 50px;
    background-color: white;
    border: 1px solid black;
    color: red;
}

.squarePass {
    height: 50px;
    width: 50px;
    background-color: white;
    border: 1px solid black;
    color: red;
    background-color: red;
}
img {
  cursor: grab;
  user-select: none;
}
</style>