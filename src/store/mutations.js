import {
  ADD_TABS,
  DELETE_TABS,
  SET_CURRENTTAB
} from './mutations-types'

export default {
  [ADD_TABS] (state, tab) {
    const { tabs } = state
    if (!tabs.some(item => item.index === tab.index)) {
      tabs.push(tab)
    }
    state.tabs = tabs
  },
  [DELETE_TABS] (state, index) {
    const { tabs, currentTab } = state
    const filterTab = tabs.filter((item) => item.index !== index)
    state.tabs = filterTab
    state.currentTab = currentTab === index ? filterTab[filterTab.length - 1].index : currentTab
  },
  [SET_CURRENTTAB] (state, index) {
    state.currentTab = index
  }
}
