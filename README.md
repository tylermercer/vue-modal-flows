# Vue Modal Flows
A Vue plugin for managing modal flows in Vue. Note that these flows are not necessarily modal *dialogs* (hence why they're referred to as "flows" in this library). A modal flow is one where the user cannot switch to another part of the application and then return--the user must either finish the task represented by the modal flow, or cancel it.

See
[this article](https://uxplanet.org/modality-the-one-ux-concept-you-need-to-understand-when-designing-intuitive-user-interfaces-e5e941c7acb1)
for an excellent discussion of modality and its value
in creating intuitive user experiences.

## Usage

### Setup

```js
const flows = [
  {
    key: 'example-flow-key'
    component: ExampleFlow
  },
  {
    key: 'add-tag',
    component: AddTagFlow
  },
  {
    key: 'edit-post',
    component: EditPostFlow
  }
]

Vue.use(VueFlows, {
  hideCovered: false, //This determines whether the old UI is hidden while the flow is active. Default is true
  flows,
})

new Vue({
  render: h => h(VueFlowsRoot(App)),
}).$mount('#app')
```

**Important note** This library can be used in conjunction
with Vue Router, but navigating between routes is disabled
when a modal is open. This is because navigating out of a
modal flow without cancelling or completing it is contrary
to the entire point of modal flows (as explained above),
and because competing with Vue Router to correctly manage
the window history in that case (i.e. allowing the user to
return back to the modal after navigating away) is more
complexity than I felt it was worth. This may change in the
future.

### Flows

Flows are just Vue components. They may optionally do any
of the following:
* Expose a `payload` prop to take info from the flow callee.
* Emit a `'close-flow'` event to indicate that the flow
is complete and should close. This event can take a value
(the flow result) that is returned to the callee as the Promise result (see below).

Note: the recommended practice is to include a value with
the 'close-flow' event when the task associated with the
flow is completed, and include no value when the task is
cancelled. See
[MultiplierFlow.vue](/src/demo/MultiplierFlow.vue)
for an example of this.

### Starting a flow

Starting a flow is as simple as calling `$flows.start`.
The method accepts the flow key, an optional payload, and
returns a promise that resolves when the flow returns a
result.

For example:

```js
//Inside component's method block
async exampleFunction() {
  const result = await this.$flows.start(
    'example-flow-key',
    { 'this is': 'a payload' }
  )
  console.log(result);
},
```

## Q & A
### Couldn't I just use Vue Router to do this?
The advantage of using Flows over Vue Router is twofold:
* The application interface and state prior to launching the
modal flow is preserved, and restored when the modal flow is
cancelled or completed.
* Flows can be started with a callback to be called when the
flow is completed or cancelled. The `oncomplete` callback can
receive a result from the modal flow.

### How do I associate a specific URL with a modal?
My recommendation is to set vue-router to use
[history mode](https://router.vuejs.org/guide/essentials/history-mode.html)
and then use `window.location.hash` to set the URL hash when
loading the modal. To handle loading that modal when going
directly to its URL, check if there's a hash when you load
the page. If there is, open the associated modal. (This can
be done in your route component's `created` function, for
example.)

### How do I navigate to another route from within a modal?
**I know I'm not supposed to but I really really want to**
If for whatever reason you need to navigate to another route
from inside a modal, my recommendation is to close the modal
(and any parent modals) and do the navigation from the
component that launched it.

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
