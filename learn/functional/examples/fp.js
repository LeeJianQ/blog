/**
 * 管道函数实现
 * @param  {...any} args 传入的函数参数
 */
function flowRight (...args) {
    // value 执行时 传入的参数
    return function (value) {
        // 先将数组进行反转，依次从左往右执行 acc 为合并后的结果，func 执行的方法
        return args.reverse().reduce(function (acc, func) { 
            // 返回合并后的方法
            return func(acc)
        }, value)
    }
}

const compose = (...args) => value => args.reverse().reduce((acc, func) => func(acc), value)