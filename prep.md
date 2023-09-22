

. Edit nav links when year changes
. Current month in nav should be orange
. Add todo count for each month in nav
. signal changing nav link
. signal adjusted date control text
. Past months should be darkened
. add proper icons

. Toggle todo-form with space (disable when it's opened)
. Auto-focus when opening todo form
. cancel todo with esc
. Submit todo on enter
. toggle priorities with arrows


. Fix overcrowding issues
. local storage
1. add timed animations / effects (select cell, add todo, delete todo)
2. Edit priorities / text
3. Upload icons
4. The destructuring doesnt hav eto happen in sequence. Remove all obj.properties, and replace with deconstruction







Drawbacks of current structure:

1. There is one submit form, and one todo wrapper. 
-> If we were to geretate those dynamically, we would have to
    reassign the html targets and event listeners