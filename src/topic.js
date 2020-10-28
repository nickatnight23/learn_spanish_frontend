class Topic{

   constructor (topic,topicAttributes) {
        this.id = topic.id
        this.title = topicAttributes.title
        this.content = topicAttributes.content
        this.category = topicAttributes.category
        Topic.all.push(this)
}

}

Topic.all = [];