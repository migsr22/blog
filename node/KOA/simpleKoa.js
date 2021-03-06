const http = require('http');

class Koa {
    constructor() {
        // 中间件队列
        this.middlewares = [];
        this.context = Object.create(null);
        this.request = Object.create(null);
        this.response = Object.create(null);
        // 初始化的时候创建一个http服务器
        this.server = Koa.http.createServer(rawCtx => {
            this.createContext(rawCtx);//使用这个方法处理 rawCtx
            //console.log('被连接上了.....')
            this._next(this.context); // 启动链式调用,传入上下文对象作为参数        
        });
    }
    /**
     * 插入中间件
     * @param {*} fn 中间件对象
     */
    use(fn) {
        this.middlewares.push(fn);
    }
    /**
     * 当请求到来的时候，我们清空任务队列中的内容
     */
    _next(ctx) {
        // 取出中间件    
        const callbacks = this.middlewares;
        if (callbacks.length === 0) return;// 执行栈清空，停止执行
        let work = callbacks.shift(); // 取出第一个处理过程
        work.apply(this, [ctx, this._next.bind(this)]);
    }
    /**
     * 创建上下文对象
     * @param {*} req 请求对象
     * @param {*} res 返回对象
     */
    createContext(rawCtx) {
        let { rawHeaders, url, method, statusCode, statusMessage, Socket } = rawCtx;
        let request = {
            method,
            url,
            header: rawHeaders
        }
        let response = {
            status: statusCode,
            message: statusMessage,
            header: null
        }
        let res = {};
        let req = {};
        // 将组装好的对象挂载到 context 属性上。           
        this.context = {
            request,
            response,
            app: {},
            originUrl: '',
            res,
            req,
            socket: Socket
        }
        return this.context;
    }
    /**
     * 监听端口号
     * @param {Number} port 需要被监听的端口号
     */
    listen(port) {
        if (typeof port === 'number' && port > 0 && port < 65535) {
            this.server.listen(port);
        } else {
            throw new Error(`${port}端口号无效，请输入一个有效的端口号......`);
        }
    }
}
// 模拟实现一个Koa   
Koa.http = http;

exports.Koa = Koa;