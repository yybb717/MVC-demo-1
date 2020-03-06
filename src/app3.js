import "./app3.css";
import $ from "jquery";

//监听方块的点击事件
//1、获得方块
const $square = $("#app3 .square");
//2、监听方块，当点击后，有class就删掉，没有class就加上
$square.on("click", () => {
  //$square.addClass("active");点击后就会移动过去
  $square.toggleClass("active");
});
