import { addEvent } from "./eventManager";
import { normalizeVNode } from "./normalizeVNode.js";
/*
 * 가상 DOM(Virtual DOM) 노드를 실제 DOM 요소로 변환하는 다리 역할
 * */
export function createElement(vNode) {
  // 1
  const nomalized = normalizeVNode(vNode);
  if (typeof nomalized === "string") {
    return document.createTextNode(nomalized);
  }
  // 2
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    for (const vNodeElement of vNode) {
      const vNodeElType = vNodeElement.type;
      fragment.appendChild(document.createElement(vNodeElType));
    }
    return fragment;
  }
  // 3
  if (typeof vNode?.type === "function") {
    throw new Error("vNode.type is function !!");
  }
  // 4
  // 함수 컴포넌트는 이미 걸러짐
  if (typeof vNode === "object" && typeof vNode.type === "string") {
    const { type, props, children } = vNode;
    const el = document.createElement(type);
    // props Falsy 값 일 경우 빈 객체 설정 > entries 빈 배열 되므로 for 문 동작 X
    const entries = Object.entries(props || {});
    for (const [key, value] of entries) {
      el.setAttribute(key.toLowerCase() === "classname" ? "class" : key, value);
    }
    // 자식 또한 부모와 동일하게
    if (children.length > 0) {
      for (const child of children) {
        el.appendChild(createElement(child));
      }
    }
    return el;
  }
}

function updateAttributes($el, props) {}
