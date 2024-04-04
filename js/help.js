/**
 * Generates HTML content for the main help page.
 * 
 * @returns {string} The HTML content for the main help page.
 */
function generateHtmlMainHelp() {
    return /*html*/`
        <div class="help">
            <img onclick="renderPage('summary-page', 'render-summary')" class="back-arrow-btn" src="../assets/img/icons/arrow_back_btn.svg" alt="back-arrow-btn">
            <h2>Help</h2>
            <p>Welcome to the help page for <span>Join</span>, your guide to using our kanban project management tool. Here,
                we'll provide an overview of what <span>Join</span> is, how it can benefit you, and how to use it.</p>

            <h3>What is Join?</h3>
            <p><span>Join</span> is a kanban-based project management tool designed and built by a group of dedicated
                students as part of their web development bootcamp at the Developer Akademie.<br><br>

                Kanban, a Japanese term meaning "billboard", is a highly effective method to visualize work, limit
                work-in-progress, and maximize efficiency (or flow). <span>Join</span> leverages the principles of kanban to
                help users manage their tasks and projects in an intuitive, visual interface.<br><br>

                It is important to note that <span>Join</span> is designed as an educational exercise and is not intended
                for extensive business usage. While we strive to ensure the best possible user experience, we cannot
                guarantee consistent availability, reliability, accuracy, or other aspects of quality regarding
                <span>Join</span>.
            </p>

            <h3>How to use it</h3>
            <p>Here is a step-by-step guide on how to use <span>Join</span>:</p>
            <ol type="1">
                <li>
                    <h4>Exploring the Board</h4>
                    <p>When you log in to <span>Join</span>, you'll find a default board. This board represents your project
                        and contains four default lists: "To Do", "In Progress", “Await feedback” and "Done".</p>
                </li>
                <li>
                    <h4>Creating Contacts</h4>
                    <p>In <span>Join</span>, you can add contacts to collaborate on your projects. Go to the "Contacts"
                        section, click on "New contact", and fill in the required information. Once added, these contacts
                        can be assigned tasks and they can interact with the tasks on the board.</p>
                </li>
                <li>
                    <h4>Adding Cards</h4>
                    <p>Now that you've added your contacts, you can start adding cards. Cards represent individual tasks.
                        Click the "+" button under the appropriate list to create a new card. Fill in the task details in
                        the card, like task name, description, due date, assignees, etc.</p>
                </li>
                <li>
                    <h4>Moving Cards</h4>
                    <p>As the task moves from one stage to another, you can reflect that on the board by dragging and
                        dropping the card from one list to another.</p>
                </li>
                <li>
                    <h4>Deleting Cards</h4>
                    <p>Once a task is completed, you can either move it to the "Done" list or delete it. Deleting a card
                        will permanently remove it from the board. Please exercise caution when deleting cards, as this
                        action is irreversible. Remember that using <span>Join</span> effectively requires consistent
                        updates from you and your team to ensure the board reflects the current state of your project. Have
                        more questions about <span>Join</span>? Feel free to contact us at info@developer-akademie.de. We're
                        here
                        to help you!</p>
                </li>
            </ol>
            <h3>Enjoy using Join!</h3>
        </div>
    `;
}