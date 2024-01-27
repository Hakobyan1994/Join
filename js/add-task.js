function renderAddTask() {
    let content = document.getElementById('add-task');
    content.innerHTML = '';

    content.innerHTML = /*html*/`
        <h2>Add Task</h2>
        <div class="main-box">
            <form>
                <div class="">
                    <label for="" class="">Title<p class="red">*</p></label>
                    <input type="text" class="" id="" placeholder="Enter a title" required>
                    <div id="" class="d-none">
                        This field is required
                    </div>
                </div>
                <div class="">
                    <label class="">Description</label>
                    <textarea class="form-control" placeholder="Enter a Description"></textarea>
                </div>
                <label>Assigned to<p class="red">*</p></label>
                <select class="form-control" aria-label="Default select example">
                    <option selected>Select contacts to assign</option>
                    <option value="1">Anton Mayer</option>
                    <option value="2">Anja Schulz</option>
                    <option value="3">Sofia Müller</option>
                </select>
            </form>
            <p class="line"></p>
            <form class="was-validated">
                <div class="col-md-3">
                    <label for="validationServer05" class="form-label">Due date<p class="red">*</p></label>
                    <div>
                        <input type="text" class="form-control is-invalid" id="validationServer05" aria-describedby="validationServer05Feedback" placeholder="dd/mm/yyyy" required>
                        <img src="/assets/img/icons/calender.svg" alt="Calender">
                    </div>
                    <div id="validationServer05Feedback" class="invalid-feedback">
                        This field is required
                    </div>
                </div>
                <label for="">Prio</label>
                <div class="" role="group">
                    <button type="button" class="">Urgent <img src="/assets/img/icons/prio-urgent.svg" alt="Urgent Prio"></button>
                    <button type="button" class="">Medium <img src="/assets/img/icons/prio-medium.svg" alt="Medium Prio"></button>
                    <button type="button" class="">Low <img src="/assets/img/icons/prio-low.svg" alt="Low Prio"></button>
                </div>
                <label>Category<p class="red">*</p></label>
                <select class="">
                    <option selected>Select task category</option>
                    <option value="1">Technical Task</option>
                    <option value="2">User Story</option>
                </select>
                <label for="" Subtasks></label>
                <input type="text">
            </form>
        </div>    
    `;
}