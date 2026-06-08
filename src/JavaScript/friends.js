import { computed, onBeforeUnmount, onMounted, readonly, shallowRef } from 'vue'
import errorIcon0 from '../assets/ErrorSVG/Error0.svg'
import errorIcon1 from '../assets/ErrorSVG/Error1.svg'
import errorIcon2 from '../assets/ErrorSVG/Error2.svg'
import errorIcon3 from '../assets/ErrorSVG/Error3.svg'
import errorIcon4 from '../assets/ErrorSVG/Error4.svg'
import fileLockedIcon from '../assets/ErrorSVG/FileLocked.svg'

export const friendsErrorMessages = [
  { message: 'Unauthorised', icon: errorIcon1 },
  { message: 'Not Found', icon: errorIcon2 },
  { message: 'Error Code 418', icon: errorIcon0 },
  { message: '500 Server Error', icon: errorIcon4 },
  { message: 'java.lang.NullPointerException', icon: errorIcon3 },
  { message: 'Critical Error', icon: errorIcon0 },
  { message: 'File Locked', icon: fileLockedIcon },
]

const loadingDurationMs = 1650
const firstErrorDelayMs = 180
const minimumSpawnMs = 140
const maximumSpawnMs = 430
const returnHomeAfterPopupCount = 27
const minimumReturnHomeDelayMs = 2000
const maximumReturnHomeDelayMs = 3000

function getRandomBetween(min, max) {
  return min + Math.random() * (max - min)
}

function createErrorPopup(template, index) {
  return {
    id: `friends-error-${Date.now()}-${index}`,
    icon: template.icon,
    label: `${template.message} error notification`,
    message: template.message,
    style: {
      left: `${getRandomBetween(4, 76).toFixed(2)}vw`,
      top: `${getRandomBetween(9, 82).toFixed(2)}svh`,
      animationDelay: `${getRandomBetween(0, 0.16).toFixed(2)}s`,
      rotate: `${getRandomBetween(-1.2, 1.2).toFixed(2)}deg`,
    },
  }
}

export function useFriendsSystem(options = {}) {
  const loadingProgress = shallowRef(0)
  const isLoading = shallowRef(true)
  const errorPopups = shallowRef([])
  const isPageReady = computed(() => !isLoading.value)

  let animationFrameId = 0
  let delayedErrorTimerId = 0
  let errorTimerId = 0
  let returnHomeTimerId = 0
  let loadingStartTime = 0
  let errorIndex = 0
  let hasScheduledReturnHome = false

  function scheduleReturnHome() {
    if (hasScheduledReturnHome || typeof options.onReturnHome !== 'function') {
      return
    }

    hasScheduledReturnHome = true
    returnHomeTimerId = window.setTimeout(options.onReturnHome, getRandomBetween(minimumReturnHomeDelayMs, maximumReturnHomeDelayMs))
  }

  function pushErrorPopup() {
    const template = friendsErrorMessages[errorIndex % friendsErrorMessages.length]
    errorPopups.value = [...errorPopups.value, createErrorPopup(template, errorIndex)]
    errorIndex += 1

    if (errorPopups.value.length >= returnHomeAfterPopupCount) {
      scheduleReturnHome()
    }
  }

  function scheduleNextError() {
    errorTimerId = window.setTimeout(() => {
      pushErrorPopup()
      scheduleNextError()
    }, getRandomBetween(minimumSpawnMs, maximumSpawnMs))
  }

  function startErrorStream() {
    pushErrorPopup()
    delayedErrorTimerId = window.setTimeout(pushErrorPopup, firstErrorDelayMs)
    scheduleNextError()
  }

  // 进度条计时器逻辑：用 requestAnimationFrame 记录真实经过时间，按 loadingDurationMs 换算 0-100% 进度。
  // 达到 100% 后停止加载态并启动错误弹窗流，保证页面约 1-2 秒后展示。
  function updateLoadingProgress(timestamp) {
    if (!loadingStartTime) {
      loadingStartTime = timestamp
    }

    const elapsed = timestamp - loadingStartTime
    loadingProgress.value = Math.min(100, (elapsed / loadingDurationMs) * 100)

    if (loadingProgress.value < 100) {
      animationFrameId = window.requestAnimationFrame(updateLoadingProgress)
      return
    }

    isLoading.value = false
    loadingProgress.value = 100
    startErrorStream()
  }

  onMounted(() => {
    animationFrameId = window.requestAnimationFrame(updateLoadingProgress)
  })

  onBeforeUnmount(() => {
    window.cancelAnimationFrame(animationFrameId)
    window.clearTimeout(delayedErrorTimerId)
    window.clearTimeout(errorTimerId)
    window.clearTimeout(returnHomeTimerId)
  })

  return {
    errorPopups: readonly(errorPopups),
    isLoading: readonly(isLoading),
    isPageReady,
    loadingProgress: readonly(loadingProgress),
  }
}