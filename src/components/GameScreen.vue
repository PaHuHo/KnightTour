<template>
    <h1>Mã đi tuần {{ num }} x {{ num }}</h1>
    <div class="board"
        :style="{ display: 'grid', gridTemplateColumns: `repeat(${num}, 50px)`, gridTemplateRows: `repeat(${num}, 50px)` }"
        style="justify-content: center;">
        <div v-for="i in num * num" :key="i">
            <div :class="knightPass.includes(i) ? 'squarePass' : 'square'" @dragover.prevent @drop="goIntoSquare(i)">

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

    <ul>
        <li class="btn btn-primary" @click="undoGame">
            UNDO
        </li>
        <li class="btn btn-info" @click="restartGame">
            RESTART
        </li>
        <li class="btn">
            <router-link :to="{ name: 'game-menu' }" class="btn btn-light">EXIT</router-link>
        </li>
    </ul>

    <!-- Modal Complete Game-->
    <div class="modal fade" id="finishGameModel" tabindex="-1" role="dialog"
        aria-labelledby="finishGameModelCenterTitle" aria-hidden="true" style="color: black;">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Chúc mừng bạn đẫ hoàn thành bảng {{ num }}x{{ num
                        }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <span>Các nước đi của bạn là: </span>
                    <span v-for="index in knightPass"><span v-if="index != 1">-></span>{{ index }}</span>
                </div>
                <div class="modal-footer">
                    <router-link :to="{ name: 'game-menu' }" class="btn btn-primary"
                        @click.native="closeModal">EXIT</router-link>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useKnightStore } from '@/store/knight';
import { nextTick } from 'vue'

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
function goIntoSquare(index) {
    if (knightPass.value.length + 1 == num.value * num.value) {
        finishGame()
    }
    let rowNum = Math.floor((index - 1) / num.value)
    let colNum = (index - 1) % num.value

    if (((knight.knightRow + 2 == rowNum || knight.knightRow - 2 == rowNum) && (knight.knightCol + 1 == colNum || knight.knightCol - 1 == colNum) || (knight.knightRow + 1 == rowNum || knight.knightRow - 1 == rowNum) && (knight.knightCol + 2 == colNum || knight.knightCol - 2 == colNum)) && !knightPass.value.includes(index)) {
        knight.moveKnight(rowNum, colNum)
        setKnightPass(index)
    }
};
function finishGame() {
    console.log("Done")
    nextTick(() => {
        $('#finishGameModel').modal('show');
    });
}
function closeModal() {
  // Đóng modal
  $('#finishGameModel').modal('hide');

  // Xóa backdrop thủ công nếu vẫn còn
  $('.modal-backdrop').remove();
  $('body').removeClass('modal-open');
  $('body').css('padding-right', '');
}
function setKnightPass(index) {
    knightPass.value.push(index)
}


function onDragStart(e) {
    dragged.value = {
        row: knight.knightRow,
        col: knight.knightCol,
    };
}

function restartGame() {
    knightPass.value = []
    knight.moveKnight(0, 0);
    setKnightPass(1)
}
function undoGame() {
    //Kiểm tra xem số bước đi có nhiều hơn ban đầU k nếU không thì k cần undo
    if (knightPass.value.length <= 1) {
        return
    }
    //Xóa phần tử cuối cùng trong mảng bước đi của mã
    knightPass.value.pop(knightPass.value.at(knightPass.value.length - 1))


    knight.moveKnight(Math.floor((knightPass.value.at(knightPass.value.length - 1) - 1) / num.value), (knightPass.value.at(knightPass.value.length - 1) - 1) % num.value);

    //Kiểm tra xem trong mảng mã đi đã có giá trị chưa để tránh bị lập lại nước đi
    if (knightPass.value.indexOf(knightPass.value.at(knightPass.value.length - 1)) == -1) {
        setKnightPass(knightPass.value.at(knightPass.value.length - 1))
    }

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

ul {
    padding: 0;
}

ul>li {
    margin: 10px;
}
</style>