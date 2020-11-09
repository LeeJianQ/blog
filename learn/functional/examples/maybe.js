/**
 * 消除空指针异常，缺点：难以定位出错的位置
 */
class MayBe {
    static of (value) {
        return new MayBe(value)
    }

    constructor (value) {
        this._value = value
    }

    map (fn) {
        return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this._value))
    }

    /**
     * 判断当前指针是否为空
     */
    isNothing () {
        return this._value === null || this._value === undefined
    }
}