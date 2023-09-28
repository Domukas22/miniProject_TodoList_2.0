. restore deletes todos
. Fix overcrowding issues
. ad calender swap animations
. stop editing form if you change priority or delete white the form is open
. blank days should be showing past and future month todos
. show how many days left until selected date
. create animations of add and todo with pure css (https://www.youtube.com/watch?v=f1WMjDx4snI&t=860s&ab_channel=DevTips)
. unfocus input on form close

Drawbacks of current structure:

1. There is one submit form, and one todo wrapper.
   -> If we were to geretate those dynamically, we would have to
   reassign the html targets and event listeners
