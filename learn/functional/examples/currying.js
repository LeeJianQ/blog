/**
 * @param {*} fn 需要柯里化的函数
 */
function currying (fn) {
    return function curryFn (...args) {
        // 比较形式参数与实际参数的长度
        if (fn.length > args.length) {
            return function () {
                // 合并形式参数，再次执行当前函数
                curryFn(...args.concat(Array.from(arguments)))
            }
        }
        // 形式参数大于等于实际参数时，执行实际参数，并且返回执行结果
        return fn(...args)
    }
}

function a(b, c, d) {
    console.log(arguments)
}

let e = currying(a)
e(1)
e(2)
e(3)