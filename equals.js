function equals(o1, o2) {
  var _$arr = [];
  return _$equals(o1, o2, _$arr);
}

function _$equals(o1, o2, _$arr) {
  if (o1 === o2) return true;
  if (o1 === null || o2 === null) return false;
  // eslint-disable-next-line no-self-compare
  if (o1 !== o1 && o2 !== o2) return true; // NaN === NaN
  if (_$seen(o1, _$arr)) return true;
  _$arr.push(o1);
  var t1 = typeof o1, t2 = typeof o2, length, key, keySet;
  if (t1 === t2 && t1 === 'object') {
    if (isArray(o1)) {
      if (!isArray(o2)) return false;
      if ((length = o1.length) === o2.length) {
        for (key = 0; key < length; key++) {
          if (!_$equals(o1[key], o2[key], _$arr)) return false;
        }
        return true;
      }
    } else if (isDate(o1)) {
      if (!isDate(o2)) return false;
      return simpleCompare(o1.getTime(), o2.getTime());
    } else if (isRegExp(o1)) {
      if (!isRegExp(o2)) return false;
      return o1.toString() === o2.toString();
    } else {
      if (isScope(o1) || isScope(o2) || isWindow(o1) || isWindow(o2) ||
        isArray(o2) || isDate(o2) || isRegExp(o2)) return false;
      keySet = createMap();
      for (key in o1) {
        if (key.charAt(0) === '$' || isFunction(o1[key])) {
          continue;
        }
        if (!_$equals(o1[key], o2[key], _$arr)) return false;
        keySet[key] = true;
      }
      for (key in o2) {
        if (!(key in keySet) &&
          key.charAt(0) !== '$' &&
          isDefined(o2[key]) &&
          !isFunction(o2[key])) return false;
      }
      return true;
    }
  }
  return false;
}

function _$seen(o, _$arr) {
  for (var i = 0; i < _$arr.length; i++) {
    if (_$arr[i] === o) return true;
  }
  return false;
}
