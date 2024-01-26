function renderAddTask() {
    let content = document.getElementById('add-task');
    content.innerHTML = '';

    content.innerHTML = /*html*/`
        <h2>Add Task</h2>
        <div class="main-box">
            <form class="was-validated">
                <div class="col-md-3">
                    <label for="validationServer05" class="form-label">Title<p class="red">*</p></label>
                    <input type="text" class="form-control is-invalid" id="validationServer05" aria-describedby="validationServer05Feedback" required>
                    <div id="validationServer05Feedback" class="invalid-feedback">
                        This field ist required
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label">Description</label>
                    <textarea class="form-control" placeholder="Enter a Description"></textarea>
                </div>
                <label>Assigned to</label><p class="red">*</p></p>
                <select class="form-select" aria-label="Default select example">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
            </form>
            <p></p>
            <form class="was-validated">
                <div class="mb-3">
                    <label for="validationTextarea" class="form-label">Textarea</label>
                    <textarea class="form-control" id="validationTextarea" placeholder="Required example textarea" required></textarea>
                    <div class="invalid-feedback">
                        Please enter a message in the textarea.
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