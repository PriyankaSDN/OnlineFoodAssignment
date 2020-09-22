export function defaultNavigationStyle() {
  return {
    statusBar: {
      visible: true,
      style: 'light',
      hideWithTopBar: false,
      blur: false,
    },
    topBar: {
      visible: false,
      height: 0,
    },
    animations: {
      push: {
        waitForRender: true,
      },
    },
  };
}
