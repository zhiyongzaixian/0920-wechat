function fun(...value) {
  console.log(arguments);
  console.log(value);
}

fun(11,22,33)


let arr = [1,2,5,6,7,3,4]
console.log(...arr); // iterator接口
console.log([...arr].splice(0, 5));
console.log(arr);


let a = 'kobe'
let obj = {};
obj[a] = 'wade'
console.log(obj);