export function getMetaValue(name: string) {
  const element = findElement(document.head, `meta[name="${name}"]`)
  if (element) {
    return element.getAttribute('content')
  }
}

export function findElement(root: any, selector: any) {
  if (typeof root == 'string') {
    selector = root
    root = document
  }
  return root.querySelector(selector)
}
