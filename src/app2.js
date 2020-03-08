import "./app2.css";
import $ from "jquery";

const eventBus = $(window);

const localKey = "app2.index";

// 一、数据相关都放到m
const m = {
  //1.有个数据本数
  data: {
    index: parseInt(localStorage.getItem(localKey)) || 0
  },
  //2.可以对数据增删改查
  create() {},
  delete() {},
  //本模块只需要对数据修改。update函数①把老数据替换成参数变成新数据，②触发eventBus的m：updated事件，③把新数据储存
  update(data) {
    Object.assign(m.data, data);
    eventBus.trigger("m:updated");
    localStorage.setItem("index", m.data.index);
  },
  get() {}
}

// 二、视图相关都放到v
const v = {
    //1、一个空容器，以后就是装html的容器

  el: null,
   //2、要添加的html（对数据渲染，所以想想如何在html里利用数据）
       //这个html是个函数，必须把数据给它当参数，把字符串里的东西替换了，然后他才会返回html字符串
       //如果数据（下标、参数）是0，那就说明点到第一个按钮，给第一个按钮和第一个内容加class，
       //如果数据（下标、参数）是1，那就说明点到第二个按钮，给第一个按钮和第二个内容加class
       //用data-*做标记方法，把li的下标记下来出来。
  html: index => {
    return `
    <div>
      <ol class="tab-bar">
        <li class="${ 
          index === 0 ? "selected" : ""
        }" data-index="0"><span>1111</span></li>
        <li class="${
          index === 1 ? "selected" : ""
        }" data-index="1"><span>2222</span></li>
      </ol>
      <ol class="tab-content">
        <li class="${index === 0 ? "active" : ""}">内容1</li>
        <li class="${index === 1 ? "active" : ""}">内容2</li>
      </ol>
    </div>
`;
  },
  //3、初始化容器函数，参数是我们给的要当容器的元素（应该是index.html里就有的元素）
  init(container) {
    v.el = $(container);
  },
  //4、渲染函数，参数将是数据。也就是视图全都是对数据渲染 view = render(data)
  render(index) {
    if (v.el.children.length !== 0) v.el.empty();
    $(v.html(index)).appendTo(v.el);
  }
};

// 三、其他都c
const c = {
  //1.总初始化函数，参数是我们给的要当容器的元素

  init(container) {
    v.init(container);
    v.render(m.data.index); // view = render(data)
    c.autoBindEvents();
    eventBus.on("m:updated", () => {
      v.render(m.data.index);
    });
  },
//2、自动绑定事件
  //(1)把所有事件写成哈希表
  events: {
    "click .tab-bar li": "x"
  },
  //(2)每个事件要执行的函数写出来
  //每次点击那个li，取出我们在html里加好的他的data-index，这样我们就知道下标了，也就是数据。用dataset.index取出来！
  x(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    m.update({ index: index });
  },
  //(3)自动绑定事件
  autoBindEvents() {
    for (let key in c.events) {
      const value = c[c.events[key]];
      const spaceIndex = key.indexOf(" ");
      const part1 = key.slice(0, spaceIndex);
      const part2 = key.slice(spaceIndex + 1);
      v.el.on(part1, part2, value);
    }
  }
};

//必须把总初始化函数导出来使用，所以把整个c导出来。在main.js里使用总初始化函数。
export default c;
