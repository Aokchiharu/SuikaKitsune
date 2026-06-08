import { computed, onBeforeUnmount, onMounted, shallowRef, watch } from 'vue'

export function useTerminalStream(activeQuery, options = {}) {
  const { interval = 18, step = 2, cursorInterval = 520 } = options
  const visibleCharacterCount = shallowRef(0)
  const isStreaming = shallowRef(false)
  const isCursorVisible = shallowRef(true)
  let typingTimer = 0
  let cursorTimer = 0

  const totalCharacterCount = computed(() => (
    activeQuery.value.output.reduce((total, line) => total + getLineText(line).length + 1, 0)
  ))

  const visibleOutputLines = computed(() => {
    let remainingCharacters = visibleCharacterCount.value

    return activeQuery.value.output.reduce((visibleLines, line) => {
      if (remainingCharacters <= 0) {
        return visibleLines
      }

      const lineLength = getLineText(line).length
      const visibleLength = Math.min(remainingCharacters, lineLength)
      visibleLines.push({
        segments: getVisibleSegments(line.segments, visibleLength),
      })
      remainingCharacters -= lineLength + 1
      return visibleLines
    }, [])
  })

  function clearTypingTimer() {
    window.clearInterval(typingTimer)
    typingTimer = 0
  }

  function clearCursorTimer() {
    window.clearInterval(cursorTimer)
    cursorTimer = 0
  }

  function startCursorBlink() {
    clearCursorTimer()
    isCursorVisible.value = true

    cursorTimer = window.setInterval(() => {
      isCursorVisible.value = !isCursorVisible.value
    }, cursorInterval)
  }

  function streamActiveQuery() {
    clearTypingTimer()
    visibleCharacterCount.value = 0
    isStreaming.value = true

    typingTimer = window.setInterval(() => {
      visibleCharacterCount.value = Math.min(visibleCharacterCount.value + step, totalCharacterCount.value)

      if (visibleCharacterCount.value >= totalCharacterCount.value) {
        isStreaming.value = false
        clearTypingTimer()
      }
    }, interval)
  }

  watch(() => activeQuery.value.id, streamActiveQuery, { immediate: true })
  onMounted(startCursorBlink)

  onBeforeUnmount(() => {
    clearTypingTimer()
    clearCursorTimer()
  })

  return {
    isStreaming,
    isCursorVisible,
    visibleOutputLines,
    streamActiveQuery,
  }
}

function getLineText(line) {
  return line.segments.map((segment) => segment.text).join('')
}

function getVisibleSegments(segments, visibleLength) {
  let remainingLength = visibleLength

  return segments.reduce((visibleSegments, segment) => {
    if (remainingLength <= 0) {
      return visibleSegments
    }

    const text = segment.text.slice(0, remainingLength)
    visibleSegments.push({ ...segment, text })
    remainingLength -= text.length
    return visibleSegments
  }, [])
}