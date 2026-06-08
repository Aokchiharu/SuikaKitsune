import { computed, onBeforeUnmount, onMounted, shallowRef } from 'vue'

const fallbackPositions = [
  { x: 18, y: 30 },
  { x: 73, y: 24 },
  { x: 28, y: 72 },
  { x: 80, y: 68 },
  { x: 50, y: 18 },
  { x: 58, y: 80 },
]

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function createPositionMap(nodes) {
  return nodes.reduce((positions, node, index) => {
    positions[node.id] = node.position ?? fallbackPositions[index % fallbackPositions.length]
    return positions
  }, {})
}

export function useTrustedNodeMatrix(nodes) {
  const activeNodeId = shallowRef(null)
  const draggingNodeId = shallowRef(null)
  const isMatrixLoading = shallowRef(true)
  const nodePositions = shallowRef(createPositionMap(nodes))
  let dragState = null
  let loadingTimer = 0

  const positionedNodes = computed(() => nodes.map((node, index) => {
    const position = nodePositions.value[node.id] ?? fallbackPositions[index % fallbackPositions.length]

    return {
      ...node,
      position,
      style: {
        '--node-x': `${position.x}%`,
        '--node-y': `${position.y}%`,
        '--node-delay': `${index * 90}ms`,
      },
    }
  }))

  const connectionSegments = computed(() => positionedNodes.value.map((node) => ({
    id: node.id,
    x: node.position.x,
    y: node.position.y,
    signalStrength: node.signalStrength ?? 0.86,
  })))

  function setActiveNode(nodeId) {
    activeNodeId.value = nodeId
  }

  function clearActiveNode() {
    if (draggingNodeId.value) {
      return
    }

    activeNodeId.value = null
  }

  function moveActiveNode(event) {
    if (!dragState) {
      return
    }

    const x = clamp(((event.clientX - dragState.boardRect.left) / dragState.boardRect.width) * 100, 9, 91)
    const y = clamp(((event.clientY - dragState.boardRect.top) / dragState.boardRect.height) * 100, 14, 86)

    nodePositions.value = {
      ...nodePositions.value,
      [dragState.nodeId]: { x, y },
    }
  }

  function stopNodeDrag() {
    window.removeEventListener('pointermove', moveActiveNode)
    window.removeEventListener('pointerup', stopNodeDrag)
    window.removeEventListener('pointercancel', stopNodeDrag)
    draggingNodeId.value = null
    dragState = null
  }

  function handleNodePointerDown(event, nodeId) {
    if (event.button !== 0) {
      return
    }

    const board = event.currentTarget.closest('[data-trusted-matrix-board]')

    if (!board) {
      return
    }

    event.preventDefault()
    setActiveNode(nodeId)
    draggingNodeId.value = nodeId
    dragState = {
      nodeId,
      boardRect: board.getBoundingClientRect(),
    }

    window.addEventListener('pointermove', moveActiveNode)
    window.addEventListener('pointerup', stopNodeDrag)
    window.addEventListener('pointercancel', stopNodeDrag)
  }

  onMounted(() => {
    loadingTimer = window.setTimeout(() => {
      isMatrixLoading.value = false
    }, 980)
  })

  onBeforeUnmount(() => {
    window.clearTimeout(loadingTimer)
    stopNodeDrag()
  })

  return {
    activeNodeId,
    connectionSegments,
    isMatrixLoading,
    positionedNodes,
    clearActiveNode,
    handleNodePointerDown,
    setActiveNode,
  }
}