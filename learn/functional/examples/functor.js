/**
 * 弊端：存在空指针异常问题，不可观察的副作用
 */
class Functor {
    // 消除 new 实例，把值放到上下文 Context 中
    static of (value) {
        return new Functor(value)
    }

    constructor (value) {
        this._value = value
    }

    map (fn) {
        // 返回一个新的函数，函子，this._value 是当前实例的初始值
        return Functor.of(fn(this._value))
    }
}

// 使用 设置初始值
let a = Functor.of(1)

console.log(a)

a.map(console.log)

// 消除ts校验不同模块相同变量的问题
module.exports = {}