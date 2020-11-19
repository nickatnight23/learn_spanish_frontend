const endPoint = "http://localhost:3000/api/v1/topics"

document.addEventListener('DOMContentLoaded', () => {
     getTopics()

     const createTopicForm = document.querySelector("#create-topic-form")

     createTopicForm.addEventListener("submit",(e) => 

     createFormHandler(e))
     
    
    })

  let btnClear = document.getElementById('create-button');
  let inputContents = document.getElementById('input-content');
  let inputTitle = document.getElementById('input-title');

  function clearField(){
      inputContents.value = "";
      inputTitle.value = "";
  }
  btnClear.addEventListener("click",clearField, false)
function getTopics() {
    fetch(endPoint)
    .then(response => response.json())
    .then(topics =>{
       topics.data.forEach(topic =>{
           
        
           let newTopic = new Topic(topic, topic.attributes)
           document.querySelector('#topic-container').innerHTML += newTopic.renderTopicCard()

       }) 
       document.querySelectorAll("#delete").forEach(topic => topic.addEventListener('click', removeTopic))
       
     
    })
}       
       
        function removeTopic(e){
            
            e.preventDefault()
           
            const configObj = {
                method: 'DELETE',
                // dataType: 'json',
                // processData: false
                headers:{
                    'Content-Type': 'application/json',
                    'Accept':'application/json'
                }
            }
                
            fetch(endPoint +`/${e.target.dataset.id}`,configObj)
            .then(e.target.parentElement.remove())
        }

        function createFormHandler(e){
            e.preventDefault()
            const titleInput = document.querySelector('#input-title').value
            const contentInput = document.querySelector('#input-content').value
            const categoryInput = document.querySelector('#categories').value
            const categoryId = parseInt(categoryInput)
            postFetch(titleInput, contentInput,  categoryInput)
        }

        function postFetch(title, content, category_id){
                // console.log(title, content);
                const bodyData ={title, content, category_id}
                fetch(endPoint, {
                    // POST request
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(bodyData)
                  })
                  .then(response => response.json())
                  .then(topic => {
                      //debugger
                    const topicData = topic.data.attributes
                    // render JSON response
                    
                    let newTopic = new Topic(topic, topicData)
            
           document.querySelector('#topic-container').innerHTML += newTopic.renderTopicCard()
           // to grab the delete button for the topic that was just grabbed
           //when that delete button is clicked on call remove method

        //   let element = document.querySelectorAll('#delete').slice
           const list = document.querySelectorAll("#delete");

           list[list.length-1];
           const button = list[list.length-1];
           button.addEventListener('click',removeTopic)
           //array = Array.from(list)
        //    element.slice
           //element.parentNode.removeChild(element);      
        })
    }