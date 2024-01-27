function renderAddTask() {
    let content = document.getElementById('add-task');
    content.innerHTML = '';

    content.innerHTML = /*html*/`
        <h2>Add Task</h2>
        <div class="main-box">
            <form>
                <div class="">
                    <label for="" class="">Title<p class="redstar">*</p></label>
                    <input type="text" class="" id="" placeholder="Enter a title" required>
                    <div id="" class="red">
                        This field is required
                    </div>
                </div>
                <div class="">
                    <label class="">Description</label>
                    <textarea class="" placeholder="Enter a Description"></textarea>
                </div>
                <label>Assigned to</label>
                <select class="">
                    <option selected>Select contacts to assign</option>
                    <option value="">Anton Mayer</option>
                    <option value="">Anja Schulz</option>
                    <option value="">Sofia Müller</option>
                </select>
            </form>
            <p class="line"></p>
            <form>
                <div class="">
                    <label for="" class="">Due date<p class="redstar">*</p></label>
                    <div>
                        <input type="text" class="" id="" placeholder="dd/mm/yyyy" required>
                        <img src="/assets/img/icons/calender.svg" alt="Calender">
                    </div>
                    <div id="" class="d-none">
                        This field is required
                    </div>
                </div>
                <label for="">Prio</label>
                <div class="" role="group">
                    <button type="button" class="">Urgent <img src="/assets/img/icons/prio-urgent.svg" alt="Urgent Prio"></button>
                    <button type="button" class="">Medium <img src="/assets/img/icons/prio-medium.svg" alt="Medium Prio"></button>
                    <button type="button" class="">Low <img src="/assets/img/icons/prio-low.svg" alt="Low Prio"></button>
                </div>
                <label>Category<p class="redstar">*</p></label>
                <select class="">
                    <option selected>Select task category</option>
                    <option value="">Technical Task</option>
                    <option value="">User Story</option>
                </select>
                <label for="">Subtasks</label>
                <input type="text">
            </form>
        </div>    
    `;
}