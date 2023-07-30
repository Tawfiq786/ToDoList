//Loader using Jquery
$(window).on("load",function(){
    $(".load-wrapper").fadeOut("slow");
    selectionMenu.style.position="relative";
    
})

// Code for declaring variable for the priority option menu
const selectionMenu=document.querySelector(".select-menu");
      selectBtn=selectionMenu.querySelector(".select-button");
      allOptions=selectionMenu.querySelectorAll(".option");
      btnText=selectionMenu.querySelector(".sBtn-text");

//Code for declaring other variables
const submitBtn=document.querySelector(".submit-btn");
const taskArea=document.querySelector(".list-area");
var userEnteredTask=document.querySelector(".input-task");
var remainBlock=document.querySelector(".remaining-tasks");
var listItemNumber=1;
var taskRemainNumber=0;
var selectedChoice;
var prioritySelectText;



//Used to open priority list when enter is clicked on input task area
userEnteredTask.addEventListener("keypress",(event)=>{
    if(event.charCode===13 && userEnteredTask.value!=""){
        selectionMenu.classList.add("active");
    }
})

//Function to get user input
function getTask(){
    return userEnteredTask.value;
}

//function to print user input
function printTask(userEntry,userPriority){

    var actualTaskBlock=document.createElement("div");

    var textWrapper=document.createElement("div");
    textWrapper.classList.add("task-text");

    var priorityBlock=document.createElement("span");

    actualTaskBlock.setAttribute("id",listItemNumber);


    
            //Adding to task remaining
            taskRemainNumber++;
            remainBlock.classList.remove("hide-this");
            remainBlock.textContent="Tasks Remaining:  "+ taskRemainNumber;

    
    //Creating delete BTN
    var deleteBtn=document.createElement("button");
    deleteBtn.setAttribute("class",listItemNumber);
    deleteBtn.classList.add("delete-btn")

    listItemNumber++;

    textWrapper.textContent=userEntry;

    actualTaskBlock.classList.add("task-style");

    priorityBlock.textContent=userPriority;

    switch(userPriority){
        case "Low":
            priorityBlock.classList.add("low");
            break;
        case "Med":
            priorityBlock.classList.add("med");
            break;
        case "High":
            priorityBlock.classList.add("high");
            break;
        case "Select Priority":
            taskArea.append(actualTaskBlock);
            priorityBlock.textContent="";
    }

    priorityBlock.classList.add("extra-mod");

    textWrapper.append(priorityBlock); //Use of JQuery
    actualTaskBlock.prepend(deleteBtn); //Use of JQuery
    actualTaskBlock.append(textWrapper); //Use of JQuery

    //Giving a proper pattern to add my task based on priority
    const lowElement=taskArea.querySelector(".low");
    const medElement=taskArea.querySelector(".med");
    const highElement=taskArea.querySelector(".high");

    //If low
    if(priorityBlock.classList.contains("low")){
            taskArea.append(actualTaskBlock);
    }

    //If Med
    if(priorityBlock.classList.contains("med")){
        if(lowElement){
            lowElement.parentNode.parentNode.insertAdjacentElement("beforebegin",actualTaskBlock); //Same as insertBefore
        }
        else{
            taskArea.append(actualTaskBlock);
        }
    }

    //If High
    if(priorityBlock.classList.contains("high")){
        if(medElement){
            medElement.parentNode.parentNode.insertAdjacentElement("beforebegin", actualTaskBlock);
        }

        else if(lowElement){
            lowElement.parentNode.parentNode.insertAdjacentElement("beforebegin", actualTaskBlock);
        }

    else{
        taskArea.append(actualTaskBlock);
        }
    }

    userEnteredTask.value="";
    btnText.textContent="Select Priority";
    btnText.className="sBtn-text";


}


// Code used to make the Priority Section Work

selectBtn.addEventListener("click",()=>selectionMenu.classList.toggle("active"));

allOptions.forEach(option=>{
    option.addEventListener("click",()=>{
        var selectedChoice=option.querySelector(".option-text");
        btnText.textContent=selectedChoice.textContent;
        selectionMenu.classList.remove("active");

        var choiceClassList=selectedChoice.classList;

        btnText.className="sBtn-text";


        choiceClassList.forEach(thisClass=>{
            btnText.classList.add(thisClass);
        })

    })
})


//Main function to be called when plus button is clicked
submitBtn.addEventListener("click",()=>{

    prioritySelectText=btnText.textContent;

    if(userEnteredTask.value!=""){

        printTask(getTask(),prioritySelectText);
        console.log("Task Submitted");
    }
    

})


//Function to delete task

function deleteTask(event){

    var taskElement=event.target;
    console.log(taskElement);

    //Actual Box
    if(taskElement){
        taskElement.classList.toggle("checked");
        taskElement.classList.toggle("blue-box");
        taskElement.nextElementSibling.querySelector("span").classList.toggle("delete-color");
        taskElement.closest(".task-style").classList.toggle("delete-effect");

    }

    if(!taskElement.classList.contains("checked")){
        taskRemainNumber++;
        remainBlock.textContent="Tasks Remaining:  "+ taskRemainNumber;
        console.log(taskRemainNumber);
        console.log("task restored");
    }
    else{
        taskRemainNumber--;
        remainBlock.textContent="Tasks Remaining:  "+ taskRemainNumber;
    }

    if(taskRemainNumber===0){
        remainBlock.classList.add("hide-this");
    }
    else{
        remainBlock.classList.remove("hide-this");
    }

    // Audio
    if(taskElement.classList.contains("blue-box")){
        var audio=new Audio("sounds/complete_sound.wav");
        audio.play();
    }

    var tickIcon = taskElement.querySelector(".bx-check");

    if(!tickIcon){
        var tickIcon=document.createElement("i");
        tickIcon.setAttribute("class","bx bx-check");
        taskElement.append(tickIcon);
    }
    else{
        tickIcon.remove();
    }

}

//Finding which button was clicked for delete

taskArea.addEventListener("click",(event)=>{
    
    if(event.target.classList.contains("delete-btn")){
        deleteTask(event);
    }

})




















