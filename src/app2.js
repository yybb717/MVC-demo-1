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
  //要把index储存下来
  localStorage.setItem("app2.index", index);
  // ② 那内容里的那个li元素也是排老几，把它变成出现，他的兄弟变成消失
  // ③ 找出内容li元素，的第index个，给他加上class：action(css里应该是出现)，给他的兄弟去掉class：action
  $tabContent
    .children()
    .eq(index)
    .addClass("actions")
    .siblings()
    .removeClass("actions");
});

//我想在刷新后还是上次点击的按钮，那就要储存。把每次点好后的index储存，下一次刷新页面后让js自己点击第index个就行
const index = localStorage.getItem("app2.index") || 0;
$tabBar
  .children()
  .eq(index)
  .trigger("click");
