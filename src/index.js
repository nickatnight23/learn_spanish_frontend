const endPoint = "http://localhost:3000/api/v1/topics"
const newPoint = "http://localhost:3000/api/v1/categories"

document.addEventListener('DOMContentLoaded', () => {
    getTopics()
    // const allCategories = getCategory()
    //debugger

    const createTopicForm = document.querySelector("#create-topic-form")
    const searchBar = document.getElementById('searchBar')

    searchBar.addEventListener('keyup', (e) => {
        console.log(e.target.value)
        const searchString = (e.target.value)
        allCategories()

        

        function allCategories() {
            fetch(newPoint)
                .then(response => response.json())
                .then(myCategories => {
                

                    myCategories.filter(category => {
                        console.log(category)
                        
                        if (category.name.includes(searchString)) { 
                            return category.topics
                        }
                    })
                


                })
        }


    });
    createTopicForm.addEventListener("submit", (e) =>
        createFormHandler(e))


    //  const removeTopic


})


function getTopics() {
    fetch(endPoint)
        .then(response => response.json())
        .then(topics => {
            topics.data.forEach(topic => {


                let newTopic = new Topic(topic, topic.attributes)
                document.querySelector('#topic-container').innerHTML += newTopic.renderTopicCard()

            })
            document.querySelectorAll("#delete").forEach(topic => topic.addEventListener('click', removeTopic))
            document.querySelectorAll("#update-topic").forEach(topic => topic.addEventListener('click', editTopic))

        })
}
function editTopic(e) {

    e.preventDefault()
    const id = e.target.dataset.id
    fetch(endPoint + `/${id}`)
        .then(response => response.json())
        .then(topic => {
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

function removeTopic(e) {

    e.preventDefault()

    const configObj = {
        method: 'DELETE',
        // dataType: 'json',
        // processData: false
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }

    fetch(endPoint + `/${e.target.dataset.id}`, configObj)
        .then(e.target.parentElement.remove())
}

function createFormHandler(e) {
    e.preventDefault()
    const titleInput = document.querySelector('#input-title').value
    const contentInput = document.querySelector('#input-content').value
    const categoryInput = document.querySelector('#categories').value
    const categoryId = parseInt(categoryInput)
    postFetch(titleInput, contentInput, categoryInput)
}

function postFetch(title, content, category_id) {
    console.log(title, content);
    const bodyData = { title, content, category_id }
    fetch(endPoint, {
        // POST request
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

            list[list.length - 1];
            const button = list[list.length - 1];
            button.addEventListener('click', removeTopic)
            //array = Array.from(list)
            //    element.slice
            //element.parentNode.removeChild(element);      
        })
}