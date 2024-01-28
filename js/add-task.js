function renderAddTask() {
    let content = document.getElementById('add-task');
    content.innerHTML = '';

    content.innerHTML = /*html*/`
        <h2>Add Task</h2>
        <div class="main-box">
            <div class="form">
                <form>
                    <div class="">
                        <label for="" class="">Title<p class="redstar">*</p></label>
                        <input type="text" class="inputfield" id="" placeholder="Enter a title" required>
                    </div>
                    <div class="">
                        <label class="">Description</label>
                        <textarea class="inputfield inputfield-textarea" placeholder="Enter a Description"></textarea>
                    </div>
                    <label>Assigned to</label>
                    <select class="inputfield assigned-to" aria-placeholder="">
                        <option value="" disabled selected hidden>Select contacts to assign</option>
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
                            <input type="text" class="inputfield" id="" placeholder="dd/mm/yyyy" required>
                            <!-- <img src="/assets/img/icons/calender.svg" alt="Calender"> ///// Calender Icon is missing --> 
                        </div>
                        <div id="" class="d-none">
                            This field is required
                        </div>
                    </div>
                    <label for="">Prio</label>
                    <div class="prio-btn" role="group">
                        <button type="button" class="prio-urgent">Urgent <img src="/assets/img/icons/prio-urgent.svg" alt="Urgent Prio"></button>
                        <button type="button" class="prio-medium">Medium <img src="/assets/img/icons/prio-medium.svg" alt="Medium Prio"></button>
                        <button type="button" class="prio-low">Low <img src="/assets/img/icons/prio-low.svg" alt="Low Prio"></button>
                    </div>
                    <label>Category<p class="redstar">*</p></label>
                    <select class="inputfield">
                        <option selected>Select task category</option>
                        <option value="">Technical Task</option>
                        <option value="">User Story</option>
                    </select>
                    <label for="">Subtasks</label>
                    <input type="text" class="inputfield">
                </form>
            </div>
            <div class="form-bottom">
                <div class="form-bottom-left"><p><p class="red">*</p>This field is required</p></div>
                <div class="form-bottom-right">
                    <button class="clear-btn">Clear<img src="/assets/img/icons/close1.svg" alt="Clear"></button>
                    <button class="create-task">Create Task<img src="/assets/img/icons/check1.svg" alt="Create Task"></button>
                </div>
            </div>
        </div>    
    `;
}