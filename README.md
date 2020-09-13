# Vue Modal Flows
A Vue plugin for managing modal flows in Vue. Note that these flows are not necessarily modal *dialogs* (hence why they're referred to as "flows" in this library). A modal flow is one where the user cannot switch to another part of the application and then return--the user must either finish the task represented by the modal flow, or cancel it.

## Wait, couldn't I just use Vue Router?
The advantage of using Flows over Vue Router is twofold:
* The application interface and state prior to launching the modal flow is preserved, and restored when the modal flow is cancelled or completed.
* Flows can be started with a callback to be called when the flow is completed or cancelled. The `oncomplete` callback can receive a result from the modal flow.

## Usage

```js
const flows = [
  {
    key: 'add-tag',
    component: AddTagModal
  },
  {
    key: 'edit-post',
    component: EditPostModal
  }
]

Vue.use(VueFlows, {
  hideCovered: false, //This determines whether the old UI is hidden while the modal is active. Set to true for full-screen modals
  flows,
})

new Vue({
  render: h => h(VueFlowsRoot(App)),
}).$mount('#app')
```

**Important note** This library can be used in conjunction with Vue Router, but Vue Router must be configured to use [history mode](https://router.vuejs.org/guide/essentials/history-mode.html). This is because Vue Modal Flows uses the URL hash to represent what modal is currently open.

## Development
### Project setup
```
yarn install
```

#### Compiles and hot-reloads for development
```
yarn serve
```

#### Compiles and minifies for production
```
yarn build
```

#### Lints and fixes files
```
yarn lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
