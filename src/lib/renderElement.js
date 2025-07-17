import { setupEventListeners } from "./eventManager";
import { createElement } from "./createElement";
import { normalizeVNode } from "./normalizeVNode";
import { updateElement } from "./updateElement";

const map = new WeakMap();
// vNode: UI 구조를 정의한 자바스크립트 객체 (가상 노드)
// container: vNode를 변환한 실제 DOM 요소를 삽입한 부모 요소
export function renderElement(vNode, container) {
  // 최초 렌더링시에는 createElement로 DOM을 생성하고
  // 이후에는 updateElement로 기존 DOM을 업데이트한다.
  // 렌더링이 완료되면 container에 이벤트를 등록한다.
  const normalized = normalizeVNode(vNode); // 가상 돔 정규화
  const oldVnode = map.get(container);
  if (oldVnode) {
    updateElement(container, normalized, oldVnode, 0);
  } else {
    /**
     * 문제 코드.
     * 컨테이너의 초기화 없이 요소가 이어져서 붙여짐.
     * 상태가 변함에 따라 요소가 생성되는데, 생성된 요소를 끊임 없이 붙임.
     * container.appendChild(element);
     */
    // 해결 방안: 초기화
    container.innerHTML = "";
    const element = createElement(normalized);
    container.appendChild(element);
  }
  setupEventListeners(container);
  map.set(container, normalized);
}
