


Left to do:


0. When I open a cal day, I should be opening the entire date, not the day.
This means I should be able to provide a any month with any day,
and it will display both the todos of the day, as well as regenerate calender if needed

1. get_Infos_forTodo should not need an id generator
2. Selected date should be in the logic file. The factory shoudl take in the date of the selected date
2. Edit priorities / text
3. Upload icons
4. The destructuring doesnt hav eto happen in sequence. Remove all obj.properties, and replace with deconstruction







Drawbacks of current structure:

1. There is one submit form, and one todo wrapper. 
-> If we were to geretate those dynamically, we would have to
    reassign the html targets and event listeners