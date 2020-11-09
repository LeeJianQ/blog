/**
 * 将不纯的操作交给调用者处理
 */
const fp = require('lodash/fp')
class IO{
    static of(value) {
        return new IO(function(){
            return value
        })
    }

    constructor (value) {
        this._value = value
    }

    map (fn) {
        return IO.of(fp.flowRight(fn, this._value))
    }
}

let r = IO.of(process).map(p=> p.execPath)
r._value()