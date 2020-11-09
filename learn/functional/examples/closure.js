function closure() {
    // 设置临时变量 该变量因为被外部调用 不会被销毁 会被暂存到内存中
    let a = 1
    return function () {
        console.log(a)
        a++
    }
}