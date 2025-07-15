import { createVNode } from "./createVNode.js";
/*
 * 가상 DOM(Virtual DOM) 트리의 일관성과 예측 가능성을 보장
 *
 * */
export function normalizeVNode(vNode) {
  // 1
  if (vNode === null || typeof vNode === "undefined" || vNode === false) {
    vNode = "";
  }
  // 2
  if (typeof vNode === "string" || typeof vNode === "number") {
    vNode = String(vNode);
  }
  // 3
  console.log("💻 vNode : ", vNode);
  if (typeof vNode?.type === "function") {

  }
  createVNode();
  return vNode;
}
