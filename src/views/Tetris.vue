<template>
  <div class="tetris-wrapper">
    <div class="game">
      <template v-for="(row, i) in grameData" >
        <div
          v-for="(col, j) in row"
          :style="{top: `${i * 20}px`, left: `${j * 20}px`}"
          :class="colClass(col)"
          :key="i+''+j"
        >
        </div>
      </template>
    </div>
    <div class="next-wrapper">
      <div class="next">
        <template v-for="(row, i) in nextData" >
          <div
            :class="colClass(col)"
            :key="i+''+j"
            v-for="(col, j) in row"
            :style="{top: `${i * 20}px`, left: `${j * 20}px`}"
          >
          </div>
        </template>
      </div>
      <div class="info">
        <div>已用时： <span>{{time}}</span>s</div>
        <div>已得分： <span>{{score}}</span>分</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data () {
    return {
      time: 0, // 已用时
      score: 0, // 已得分
      nextData: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      grameData: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      nextDivs: [],
      gameDivs: [],
      data: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      origin: {
        x: 0,
        y: 0
      },
      cur: [],
      next: []
    }
  },
  methods: {
    colClass (col) {
      let className = ''
      switch (col) {
        case 1:
          className = 'done'
          break
        case 2:
          className = 'current'
          break
        default:
          className = 'none'
      }
      return className
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/var';
$bg:  #f2faff;

.tetris-wrapper {
  height: 100%;
  background: $white;
  border-radius: 5px;
  overflow-y: auto;
  padding: 22px;
  box-sizing: border-box;
}
.game {
  width: 200px;
  height: 400px;
  background-color: $bg;
  border: 1px solid $color-primary;
  position: absolute;
  top: 22px;
  left: 22px;
}
.next-wrapper {
  position: absolute;
  top: 22px;
  left: 250px;
}
.next {
  width: 80px;
  height: 80px;
  background-color: $bg;
  border: 1px solid $color-primary;
  position: relative;
}
.none,
.current,
.done {
  width: 20px;
  height: 20px;
  position: absolute;
  box-sizing: border-box;
}
.none {
  background-color: $bg;
}
.current {
  background-color: pink;
  border: 1px solid $color-danger;
}
.done {
  background-color: gray;
  border: 1px solid $color-success;
}
</style>
