import "./app2.css";
import $ from "jquery";

//监听两个按钮1和2的点击事件
//1.先获取要用的元素：两个按钮的爸爸和两个内容的爸爸
const $tabBar = $("#app2 .tab-bar");
const $tabContent = $("#app2 .tab-content");
//2.监听父元素$tabBar，从而监听子元素li们(这样就不用监听两个li了)的点击事件，执行函数
$tabBar.on("click", "li", e => {
  //（1）那问题来了，到底是哪个子元素li的点击事件？
  const $li = $(e.currentTarget);
  //（2）做背景色切换:点击的那个li加上class：selected，就会有背景色了；他的兄弟删去class，就没有背景色了
  $li
    .addClass("selected")
    .siblings()
    .removeClass("selected");
  //（3）做内容切换
  // ① 点击的li元素排第几个
  const index = $li.index();
  // ② 那内容里的那个li元素也是排老几，把它变成出现，他的兄弟变成消失
  // ③ 找出内容li元素，的第index个，给他加上class：action(css里应该是出现)，给他的兄弟去掉class：action
  $tabContent
    .children()
    .eq(index)
    .addClass("actions")
    .siblings()
    .removeClass("actions");
});

//刚开始进入这个页面，我想就是显示点击了按钮一出现按钮一的内容
//那让js自己先点击
$tabBar
  .children()
  .eq(0)
  .trigger("click");
