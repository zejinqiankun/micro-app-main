const getters = {
  token: (state) => state.login.token || '123123',
  userInfo: (state) => state.user.userInfo,
  dictionarys: (state) => state.dictionary.dictionary,
  tabTagPaths:(state) => state.tab.getters.tabTagPaths
}
export default getters
