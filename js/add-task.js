function renderAddTask() {
    let content = document.getElementById('add-task');
    content.innerHTML = '';

    content.innerHTML = /*html*/`
        <h2>Add Task</h2>
        <div class="main-box">
            <form class="was-validated">
                <div class="col-md-3">
                    <input type="text" class="form-control is-invalid" id="validationServer05" aria-describedby="validationServer05Feedback" placeholder="Enter a title" required>
                    <label for="validationServer05" class="form-label">Title<p class="red">*</p></label>
                    <div id="validationServer05Feedback" class="invalid-feedback">
                        This field is required
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label">Description</label>
                    <textarea class="form-control" placeholder="Enter a Description"></textarea>
                </div>
                <label>Assigned to</label><p class="red">*</p></p>
                <select class="form-control" aria-label="Default select example">
                    <option selected>Select contacts to assign</option>
                    <option value="1">Anton Mayer</option>
                    <option value="2">Anja Schulz</option>
                    <option value="3">Sofia Müller</option>
                </select>
            </form>
            <p></p>
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
                <p>Prio</p>
                <input type="text" placeholder="Enter a title">
                <p>Category<p class="red">*</p></p>
                <input type="text" placeholder="Enter a title">
                <p>Subtasks<p class="red">*</p></p>
                <input type="text" placeholder="Enter a title">
            </form>
        </div>    
    `;
}