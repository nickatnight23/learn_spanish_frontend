const endPoint = "http://localhost:3000/api/v1/topics"

document.addEventListener('DOMContentLoaded', () => {
     getTopics()
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