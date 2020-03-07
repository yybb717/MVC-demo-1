import "./app1.css";
import $ from "jquery";

const eventBus = $(window); //这个dom元素也叫事件公交车，有个on和trigger属性，可以监听和触发任何事件，这样就可以对象间通信了
// 一、数据相关都放到m
const m = {
  //1.有个数据本数
  data: {
    n: parseInt(localStorage.getItem("n"))
  },
  //2.可以对数据增删改查
  create() {},
  delete() {},
  //本模块只需要对数据修改。update函数①把老数据替换成参数变成新数据，②触发eventBus的m：updated事件，③把新数据储存
  update(data) {
    Object.assign(m.data, data);
    eventBus.trigger("m:updated");
    localStorage.setItem("n", m.data.n);
  },
  get() {}
};
// 二、视图相关都放到v
const v = {
  //1、一个空容器，以后就是装html的容器
  el: null,
  //2、要添加的html
  html: `<div>
    <div class="output">
      <span id="number">{{n}}</span>
    </div>
    <div class="actions">
      <button id="add1">+1</button>
      <button id="minus1">-1</button>
      <button id="mul2">*2</button>
      <button id="divide2">÷2</button>
    </div>
  </div>
`,
  //3、初始化容器函数，参数是我们给的要当容器的元素（应该是index.html里就有的元素）
  init(container) {
    v.el = $(container);
  },
  //4、渲染函数，参数将是数据。也就是视图全都是对数据渲染 view = render(data)
  render(x) {
    if (v.el.children.length !== 0) v.el.empty(); //如果容器里有东西，就全删掉
    $(v.html.replace("{{n}}", x)).appendTo(v.el); //把html里的占位符替换成x，再加入容器中
  }
};
// 三、其他都c
const c = {
  //1.总初始化函数，参数是我们给的要当容器的元素
  init(container) {
    v.init(container); //①首先初始化容器
    v.render(m.data.n); // ②把html里的占位符替换成数据，然后全部渲染出来。view = render(data)
    c.autoBindEvents(); //③执行自动绑定函数
    eventBus.on("m:updated", () => {
      //④监听m:updated事件，每次触发就重新用新数据渲染一遍
      console.log("here");
      v.render(m.data.n);
    });
  },
  //2、自动绑定事件
  //(1)把所有事件写成哈希表
  events: {
    "click #add1": "add",
    "click #minus1": "minus",
    "click #mul2": "mul",
    "click #divide2": "div"
  },
  //(2)每个事件要执行的函数写出来
  add() {
    m.update({ n: m.data.n + 1 }); //每次点击就做数据的修改函数
  },
  minus() {
    m.update({ n: m.data.n - 1 });
  },
  mul() {
    m.update({ n: m.data.n * 2 });
  },
  div() {
    m.update({ n: m.data.n / 2 });
  },
  //(3)自动绑定事件
  autoBindEvents() {
    for (let key in c.events) {
      //对事件哈希表里每一个事件
      const value = c[c.events[key]]; //要执行的函数  如add
      const spaceIndex = key.indexOf(" ");
      const part1 = key.slice(0, spaceIndex); //事件名part1  如click
      const part2 = key.slice(spaceIndex + 1); //实际监听元素part2   如#add1元素
      v.el.on(part1, part2, value); //用事件委托，监听容器元素的part1事件，其实是监听他的子元素part2的part1事件，执行函数。
      //这里是用容器元素的子元素的id来选出子元素然后绑定事件给这些子元素，每次渲染子元素的id不会变的。所以用子元素id选出子元素在绑定事件，一劳永逸！
    }
  }
};

//必须把总初始化函数导出来使用，所以把整个c导出来。在main.js里使用总初始化函数。
export default c;

//监听m-updated事件，对数据修改的同时还会触发该事件，触发了就用新数据再渲染一次html

//思考过程看ipad笔记
