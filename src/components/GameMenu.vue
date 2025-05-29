<template>
    <div id="menu">
        <h1>
            MÃ ĐI TUẦN
        </h1>
        <br>
        <h2>Vui lòng chọn độ khó</h2>
        <router-link :to="{ name: 'game-screen', params: { id: '5' } }" class="btn btn-primary">5x5</router-link>
        <br>
        <router-link :to="{ name: 'game-screen', params: { id: '6' } }" class="btn btn-primary">6x6</router-link>

        <br>

        <router-link :to="{ name: 'game-screen', params: { id: '7' } }" class="btn btn-primary">7x7</router-link>
        <br>
        <router-link :to="{ name: 'game-screen', params: { id: '8' } }" class="btn btn-primary">8x8</router-link>

    </div>


</template>


<script>


</script>
