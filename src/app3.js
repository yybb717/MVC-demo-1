import "./app3.css";
import $ from "jquery";
const app3Html = `
      <section id="app3"><div class="square"></div></section>
`;
$(app3Html).appendTo($("body>.page"));
//1、获得方块
const $square = $("#app3 .square");

//2、设置初始方块的位置
//如果储存的是yes，那么说明刷新前有class，那么说明active为true，初始化时就给他再加上class，不然会回去；
//如果储存的no、undefined，那么说刷新前没有class，那么说明active为false，初始化时就给他再删去class，仍然在原地不动
const active = localStorage.getItem("app3.active") === "yes";
// if (active) {
//   $square.addClass("active");
// } else {
//   $square.removeClass("active");
// }  这五行等价于下面这一行
$square.toggleClass("active", active);

//3、监听方块，当点击后，有class就删掉，没有class就加上
$square.on("click", () => {
  if ($square.hasClass("active")) {
    localStorage.setItem("app3.active", "no");
    $square.removeClass("active");
  } else {
    $square.addClass("active");
    localStorage.setItem("app3.active", "yes");
  }
});
