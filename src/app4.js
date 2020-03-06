import "./app4.css";
import $ from "jquery";
const app4Html = `
      <section id="app4"><div class="circle"></div></section>
`;
$(app4Html).appendTo($("body>.page"));

const $circle = $("#app4 .circle");
//2、监听圆，的当鼠标浮上去事件-就加上class，的鼠标移走事件-删除class（class里有动画）
$circle
  .on("mouseenter", () => {
    $circle.addClass("active");
  })
  .on("mouseleave", () => {
    $circle.removeClass("active");
  });
