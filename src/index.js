const endPoint = "http://localhost:3000/api/v1/topics"
document.addEventListener('DOMContentLoaded', () => {
     getTopics()
     state = {
         data: []
     }
     const createTopicForm = document.querySelector("#create-topic-form")
     createTopicForm.addEventListener("submit",(e) => 
     createFormHandler(e))
    const form = document.getElementById('searchbar')
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        const input = document.getElementById("item-name").value
        document.querySelector('#topic-container').innerHTML = ""
        if(input === ""){
            state.data.forEach(topic =>{
                let newTopic = new Topic(topic, topic)
               document.querySelector('#topic-container').innerHTML += newTopic.renderTopicCard()
           }) 
            document.querySelectorAll("#delete").forEach(topic => topic.addEventListener('click', removeTopic))
            document.querySelectorAll("#update-topic").forEach(topic => topic.addEventListener('click', editTopic))
        } else{
        const result = Object.values(state.data).filter(topic=> {     
            
            if(topic.category.name === input){
                // debugger
                // console.log(name.attributes, "here")
                return topic
            }
        })
        console.log(result)
        let searchedTopic = new Topic(result, result[0])
        document.querySelector('#topic-container').innerHTML = ""
        document.querySelector('#topic-container').innerHTML += searchedTopic.renderTopicCard()
    }
    })
    })
function getTopics() {
    fetch(endPoint)
    .then(response => response.json())
    .then(topics =>{
       topics.data.forEach(topic =>{
            state.data.push(topic.attributes)
           let newTopic = new Topic(topic, topic.attributes)
           document.querySelector('#topic-container').innerHTML += newTopic.renderTopicCard()
       }) 
       document.querySelectorAll("#delete").forEach(topic => topic.addEventListener('click', removeTopic))
        document.querySelectorAll("#update-topic").forEach(topic => topic.addEventListener('click', editTopic))
    })
}       
        function editTopic(e){
            e.preventDefault()
            const id = e.target.dataset.id
            fetch(endPoint + `/${id}`)
            .then(response => response.json())
            .then(topic =>{
                const html = 
                `<input id='input-title' type="text" name="title" value=${topic.title}>
                <br><br>
                <br><br>
                <textarea id='input-content' name="content" rows="8" cols="80" value=${topic.content}>
                <br><br>
                <br><br>
                  <p>Choose A Topic</p>
                <select id="categories" name="categories">
                  <option value="1">Verb</option>
                  <option value="2">Food</option>
                  <option value="3">Conversation</option>
                </select>
                <br><br>
                <input id= 'create-button' type="submit" name="submit" value="Create New Topic" class="submit">
              </form>
            `
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
                    // state.data.push(topic)
                    // console.log(topic, "this is topic")
                      //debugger
                    const topicData = topic.data.attributes
                    // render JSON response
                    // console.log(topicData, "this is topic data")
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