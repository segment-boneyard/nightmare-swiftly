nightmare-swiftly
=================

[Nightmare](https://github.com/segmentio/nightmare) plugin for [99designs Tasks](https://99designs.com/tasks)

### .login(email, password)

Login to your account.

### .task(instructions, uploads, callback)

Create a new task, uploads is an array of string paths, must include at least one upload by 99design Tasks rules. The callback signature is `cb(taskUrl)`.

### .state(callback)

Get the task's state. One of: `'pending'`, `'in progress'`, `'delivered'` or `'approved'`. 

### .wait(state, callback)

Lets you wait until a task hits a state.

### .download(taskUrl, path)

Download all the files produced with the task to the `path`.

### .approve(taskUrl)

Approve the completed task.

## License (MIT)

```
WWWWWW||WWWWWW
 W W W||W W W
      ||
    ( OO )__________
     /  |           \
    /o o|    MIT     \
    \___/||_||__||_|| *
         || ||  || ||
        _||_|| _||_||
       (__|__|(__|__|
```

Copyright (c) 2014 Segment.io Inc. <friends@segment.io>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

