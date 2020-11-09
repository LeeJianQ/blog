/**
 * 作用：消除多次调用xx问题
 */
const fp = require('lodash/fp')
class IO {

    static of (value) {
        return new IO(function(){
            return value
        })
    }

    constructor (value) {
        this._value = value
    }

    map (fn) {
        return new IO(fp.flowRight(fn, this._value))
    }

    join () {
        return this._value
    }

    flatMap (fn) {
        return this.map(fn).join()
    }
}