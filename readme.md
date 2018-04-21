![don mattingly feature selection](https://github.com/noahlevenson/the-haarlike-show/raw/master/donny_demo.gif)

### the-haarlike-show

On modern hardware, computing a [Haar-like feature](https://en.wikipedia.org/wiki/Haar-like_feature) over all possible scales and positions within a given image subwindow is an operation that happens so quickly, it's essentially invisible.

I was curious about what's actually happening during feature evaluation, so I wrote this web-based visualizer to illustrate the process in slow motion.

You can use it to generate a Haar-like feature with any configuration of constituent rectangles and visualize its computation through all possible scales and positions for a subwindow of a specified size.

With an applied step duration of 1 ms, the visualization is an approximately -59,999,990% speed representation.

It's permanently hosted here: https://haarlike.noahlevenson.com.

Beyond the scope of computer vision mathematics, here is a good resource for information about [Don Mattingly](https://en.wikipedia.org/wiki/Don_Mattingly).