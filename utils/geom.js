/**
 * author     dark
 * date       17/6/12
 */

(function (root, factory) {

  if (typeof define === "function" && define.amd) {
    // AMD (+ global for extensions)
    define(function () {
      return factory()
    });
  } else if (typeof module !== 'undefined' && typeof exports === "object") {
    // CommonJS
    module.exports = factory()
  } else {
    // Browser
    root.Gemo = factory()
  }
}(this, function () {


  let Gemo = function () {

  }

  /**
   *  多线 wkt 转 多线数组
   * @param s     wkt 字符串
   * @returns {*} 返回值 转换的数组
   */
  Gemo.prototype.wkt2array = function (s) {
    s = s.replace('MULTILINESTRING M ', '')

    s = s.replace(/\(\(/g, '[[[')

    s = s.replace(/\)\,\(/g, ']]+[[')

    s = s.replace(/\,/g, '],[')

    s = s.replace(/ /g, ',')

    s = s.replace(/\+/g, ',')

    s = s.replace(/\)\)/g, ']]]')

    s = JSON.parse(s)

    return s
  }

  /**
   *
   * @param arr      带 m 值的 线 数组
   * @param fx       上下行方向
   * @param begin    起点桩号
   * @param end      止点桩号
   * @returns {*}    分段后的 线 数组
   */
  Gemo.prototype.fragments = function (arr, fx, begin, end) {
    let _begin = 0, _end = 0, _a, _i, newArr, arrLength = arr.length

    for (let i = 0; i < arrLength; i++) {

      _i = fx == 1 ? i : arrLength - 1 - i

      _a = arr[_i][2]

      if (_a <= begin) {
        _begin = fx == 1 ? i : arrLength - 1 - i
      }

      if (_a <= end) {
        _end = fx == 1 ? i : arrLength - 1 - i
      }

    }

    if (fx == 1) {
      newArr = arr.slice(_begin, _end)
    } else {
      newArr = arr.slice(_end, _begin)
    }

    // console.log(fx)
    // console.log(arr.length, _begin, _end)
    // console.log(newArr)

    return newArr
  }

  /**
   * 桩号转坐标
   * @param arr   带 m 值的 线 数组
   * @param m     桩号
   * @returns {*} 返回 对应桩号的 point
   */
  Gemo.prototype.m2coord = function (arr, m, fx) {
    let _a, _i, mKey, arrLength = arr.length
    for (let i = 0; i < arrLength; i++) {

      _i = fx == 1 ? i : arrLength - 1 - i

      _a = arr[_i][2]
      if (_a <= m) {
        mKey = fx == 1 ? i : arrLength - 1 - i
      }

    }

    return arr[mKey]
  }

  return Gemo
}))
