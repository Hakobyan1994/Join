/**
 * Generates the HTML content for the summary section of the main window.
 * 
 * @returns {string} The HTML content for the summary section.
 */
function generateHtmlSummary() {
    return /*html*/`
        <div class="main-window mobile-main-summary">
            <div class="info_titleDiv">
                <h2 class="summary-headline-mobile">Join 360</h2>
                <div class="vector"></div>
                <span class="summary-span-mobile">Key Metrics at a Glance</span>
            </div>
        
            <div class="main_checkingDiv">

            <div id="profil_name" class="profil_name">
                <span id="timeOfDay" class="greeting"></span>
                <span id="greetingName" class="greetingName"></span>
            </div>
        
                <a href="#" class="summary-mobile" onclick="renderPage('board-page', 'render-board')">
                    <div class="To_Done_mainDiv">
                        <div class="toDo_mainDiv">
                            <div class="image_Todo"><img class="editImage" src="../assets/img/icons/edit.png" alt=""></div>
                            <div class="toDo_numberDiv">
                                <span class="toDo_num" id="value-todoarray"></span>
                                <span class="toDo_title">To-do</span>
                            </div>
                        </div>        
        
                        <div class="toDo_mainDiv" id="check-button-div">
                            <div class="image_Todo"><img class="editImageCheck" id="check-button" src="../assets/img/icons/check-button-white.svg" alt=""></div>
                            <div class="done_numberDiv">
                                <span class="toDo_num" id="value-donearray"></span>
                                <span class="toDo_title">Done</span>
                            </div>
                        </div>
                    </div>
        
                    <div class="mainTime_UrgentDiv">
                        <div class="urgent_Box">
                            <div class="urgentImage_div"><img class="urgentImage" src="../assets/img/icons/urgent.png" alt="">
                            </div>

                            <div class="urgentt_div">
                                <span class="urgent_Number" id="value-urgent"></span>
                                <span class="toDo_Title_Urgent">Urgent</span>
                            </div>
                        </div>

                        <div class="urgentVector"></div>
                        
                        <div class="Date_box">
                            <span id="urgentDate" class="Datespan"></span>
                            <span class="date_title">Upcoming Deadline</span>
                        </div>
                    </div>

                    <div class="tasksmain_Board">
                        <div class="board_Div">
                            <div class="board_info">
                                <span class="boardNumber" id="value-total"></span>
                                <span class="board_title"> Tasks in Board</span>
                            </div>
                        </div>

                        <div class="board_Div">
                            <div class="board_info">
                                <span class="boardNumber" id="value-progressarray"></span>
                                <span class="board_title">Tasks in Progress</span>
                            </div>
                        </div>

                        <div class="board_Div">
                            <div class="board_info">
                                <span class="boardNumber" id="value-feedbackarray"></span>
                                <span class="board_title">Awaiting Feedback</span>
                            </div>
                        </div>
                    </div>
                </div>
        
                <span id="data"></span>    
            </div>`;
}