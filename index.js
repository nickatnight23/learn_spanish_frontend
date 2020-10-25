const endPoint = "http://localhost:3000/api/v1/topics"

document.addEventListener('DOMContentLoaded', () => {
     getTopics()

     const createTopicForm = document.querySelector("#create-topic-form")

     createTopicForm.addEventListener("submit",(e) => 
     createFormHandler(e))
    })


function getTopics() {
    fetch(endPoint)
    .then(response => response.json())
    .then(topics =>{
       topics.data.forEach(topic =>{
           const topicMarkup =
           `<div data-id=${topic.id}>
           <h3>${topic.attributes.title}</h3>
           <p>${topic.attributes.content}</p>
           <button data-id=${getTopics.id}>edit</button>
           </div>
           <br></br>`

           document.querySelector('#topic-container').innerHTML += topicMarkup
       }) 
    
    })
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
                console.log(title, content, category_id);
                const bodyData ={title, content, category_id}
                fetch(endPoint, {
                    // POST request
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(bodyData)
                  })
                  .then(response => response.json())
                  .then(topic => {
                    const topicData = topic.data.attributes
                    // render JSON response
                    const topicMarkup = `
                    <div data-id=${topic.id}>
                      <h3>${topicData.title}</h3>
                      <p>${topicData.category.name}</p>
                      <button data-id=${topicData.id}>edit</button>
                    </div>
                    <br><br>`;

                    document.querySelector('#topic-container').innerHtml += topicMarkup;

        })
    }