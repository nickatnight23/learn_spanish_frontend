class Topic {

        constructor (topic,topicAttributes) {
             this.id = topicAttributes.id
             this.title = topicAttributes.title
             this.content = topicAttributes.content
             this.category = topicAttributes.category
             Topic.all.push(this)
     }
     // is this working
     
             renderTopicCard() {
     
             return `
                     <div data-id=${this.id}>
                       <h3>${this.title}</h3>
                       <p>${this.category.name}</p>
                       <p>${this.content}</p>
                       <button id = "update-topic" data-id=${this.id}>edit</button>
                       <button id ="delete" data-id=${this.id}>delete</button>
                     </div>
                     <br><br>`;
      }
     
     }
         
     
     Topic.all = [];