/**
 * 解决难以定位异常位置的问题
 */
class Left {
    // 消除 new 实例
    static of (value) {
        return new Left(value)
    }

    constructor (value) {
        this._value = value
    }

    map () {
        return this
    }
}

class Right {
    // 消除 new 实例
    static of (value) {
        return new Right(value)
    }

    constructor (value) {
        this._value = value
    }

    map (fn) {
        // 返回一个新的函数，函子，this._value 是当前实例的初始值
        return Right.of(fn(this._value))
    }
}

function Either(str) {
    try {
        return Right.of(JSON.stringify(str))
    } catch (e) {
        return Left.of({error: e.message})
    }
}