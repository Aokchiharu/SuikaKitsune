import { computed, shallowRef } from 'vue'
import { mindConsoleMeta, mindConsoleQueries, mindConsoleVisual } from './mindConsoleQueries'
import { useTerminalStream } from './useTerminalStream'

const emptyQuery = {
  id: 'empty',
  command: '',
  output: [],
}

export function useMindConsole() {
  const queries = mindConsoleQueries
  const activeQueryId = shallowRef(queries[0]?.id ?? emptyQuery.id)
  const activeQuery = computed(() => queries.find((query) => query.id === activeQueryId.value) ?? queries[0] ?? emptyQuery)
  const { isStreaming, isCursorVisible, visibleOutputLines, streamActiveQuery } = useTerminalStream(activeQuery)

  function selectQuery(queryId) {
    if (queryId === activeQueryId.value) {
      streamActiveQuery()
      return
    }

    activeQueryId.value = queryId
  }

  return {
    activeQuery,
    activeQueryId,
    isCursorVisible,
    isStreaming,
    meta: mindConsoleMeta,
    queries,
    selectQuery,
    visibleOutputLines,
    visual: mindConsoleVisual,
  }
}