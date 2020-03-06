import "./app1.css"; //引入css
import $ from "jquery"; //引入jquery

const app1Html = `        
<section id="app1">
  <div class="output">
    <span id="number">100</span>
  </div>
  <div class="actions">
    <button id="add">+1</button>
    <button id="minus">-1</button>
    <button id="mul">×2</button>
    <button id="divide">÷2</button>
  </div>
</section>
`;
$(app1Html).appendTo($("body>.page")); //引入html
//监听按钮们
//当用户刷新，数字不会改变：每次更新都把数字也更新存到localStorage里
//1.先获取到按钮们和包住数字的span元素
const $button1 = $("#add");
const $button2 = $("#minus");
const $button3 = $("#mul");
const $button4 = $("#divide");
const $number = $("#number");
//2.初始化数字（span里的内容）：如果储存有就是储存里的那个num的值，储存里没有就是100
const n = localStorage.getItem("num");
$number.text(n || 100);
//3.监听加号按钮的点击事件，执行函数
$button1.on("click", () => {
  let n = parseInt($number.text()); //获取数字:span元素里的内容是个数字字符串，要转化成数字，命名为n
  n += 1;
  localStorage.setItem("num", n); //n每次变化好后都要更新储存里的num
  $number.text(n); //把加好的数字重新成为span元素的内容
});
//4.监听减号按钮的点击事件，执行函数
$button2.on("click", () => {
  let n = parseInt($number.text());
  n -= 1;
  localStorage.setItem("num", n);
  $number.text(n);
});
//5.监听乘号按钮的点击事件，执行函数
$button3.on("click", () => {
  let n = parseInt($number.text());
  n *= 2;
  localStorage.setItem("num", n);
  $number.text(n);
});
//6.监听除号按钮的点击事件，执行函数
$button4.on("click", () => {
  let n = parseInt($number.text());
  n /= 2;
  localStorage.setItem("num", n);
  $number.text(n);
});
