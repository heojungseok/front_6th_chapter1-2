/**
 * 가상 DOM 생성
 * 실제 DOM으로 렌더링 할 때 필요한 모든 정보를 담고 있어야 함
 * */
export function createVNode(type, props, ...children) {
  children = [
    ...children.filter((child) => child !== null && child !== undefined && child !== false && child !== true),
  ];
  function getArrayDepth(array) {
    if (!Array.isArray(array)) {
      return 1;
    }

    let max = 1;
    for (const arrayElement of array) {
      const currentDepth = getArrayDepth(arrayElement);

      if (currentDepth + 1 > max) {
        max = currentDepth + 1;
      }
    }
    return max;
  }
  const threshold = 2;
  const depth = getArrayDepth(children);

  return { type, props, children: children.flat(threshold < depth ? Infinity : depth) };
}
