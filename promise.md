### Summary
* Promise是一个对象，如同其字面意思一样，代表了未来某时间才会知道结果的时间，不受外界因素的印象。
* Promise一旦触发，其状态只能变为fulfilled或者rejected，并且已经改变不可逆转。
* Promise的构造函数接受一个函数作为参数，该参数函数的两个参数分别为resolve和reject，其作用分别是将Promise的状态由pending转化为fulfilled或者rejected，并且将成功或者失败的返回值传递出去。
* then有两个函数作为Promise状态改变时的回调函数，当Promise状态改变时接受传递来的参数并调用相应的函数。then中的回调的过程为异步操作。
* catch方法是对.then(null,rejectFn)的封装（语法糖），用于指定发生错误时的回掉函数。一般来说，建议不要再then中定义rejected状态的回调函数，应该使用catch方法代替。
* all和race都是竞速函数，all结束的时间取决于最慢的那个，其作为参数的Promise函数一旦有一个状态为rejected，则总的Promise的状态就为rejected；
* race结束的时间取决于最快的那个，一旦最快的那个Promise状态发生改变，那个其总的Promise的状态就变成相应的状态，其余的参数Promise还是会继续进行的。