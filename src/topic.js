class Topic {

   constructor (topic,topicAttributes) {
        this.id = topic.id
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
                  <button data-id=${this.id}>edit</button>
                </div>
                <br><br>`;
 }

}
    

Topic.all = [];