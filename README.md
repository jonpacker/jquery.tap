# jquery.tap

jquery.tap is a tap listener for jquery. Rather than waiting for the slow
`click` listener to trigger on touch devices, it listens to touch events and
triggers immediately after the touch finishes. The click event usually takes
a few hundred milliseconds after this before triggering, which is a noticable
delay.

## usage

```html
<script src="jquery.tap.js"></script>
<script>
  $(".tappable").tap(function() {
    console.log("Tappable was tapped!");
  });
</script>
```

## what happens on non touch-capable devices?

If the browser the page is being viewed in does not support touches, the tap
function will delegate to the regular click listener. This makes it suitable
for responsive design.

## what happens qualifies a "tap"

A tap is qualified by a user touching the screen and then releasing the touch
without moving beyond a certain threshold. For example, if the touch moves 20
pixels, it may be considered as a drag, so the tap event will not fire. You can
manually specify this threshold in the tap event function:

```javascript
$(".tappable").tap(50, function() {
  // will be triggered as long as the touch is not dragged more than 50 pixels
});
```

## other events

Other events you can listen for that are triggered by the tap listener include:

* `tap-failed` - triggered when a touch is cancelled, or when a touch is
  released after dragging beyond the threshold.
* `exceed-tap-threshold` - triggered immediately as the tap exceeds the
  threshold between tap and drag.
