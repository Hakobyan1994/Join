function renderAddTask() {
    let content = document.getElementById('add-task');
    content.innerHTML = '';

    content.innerHTML = /*html*/`
        <h2>Add Task</h2>
        <div class="main-box">
            <div>
                <p>Title<p class="red">*</p></p>
                <input type="text" placeholder="Enter a title">
                <p>Description</p>
                <input type="text" placeholder="Enter a title">
                <p>Assigned to</p>
                <input type="text" placeholder="Enter a title">
            </div>
            <p></p>
            <div>
                <p>Due date<p class="red">*</p></p>
                <input type="text" placeholder="Enter a title">
                <p>Prio</p>
                <input type="text" placeholder="Enter a title">
                <p>Category<p class="red">*</p></p>
                <input type="text" placeholder="Enter a title">
                <p>Subtasks<p class="red">*</p></p>
                <input type="text" placeholder="Enter a title">
            </div>
        </div>    
    `;
}