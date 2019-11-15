// pages/stories/stories.js
Page({

  /**
   * Page initial data
   */
  data: {
    // story: '',
    // comment: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    
    // const request = {
    //   url: `https://cloud.minapp.com/oserve/v1/table/84988/record/${id}`,
    //   header: { 'Authorization': 'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e' },
    //   success: page.getResult
    // }
    // const requestComment = {
    //   url: 'https://cloud.minapp.com/oserve/v1/table/85188/record/',
    //   header: { 'Authorization': 'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e' },
    //   data: {
    //     where: { // filtering comments for a specific story
    //       "story_id": { "$eq": id } // story id
    //     }
    //   },
    //   success: page.getComment
    // }
    // wx.request(request)
    // wx.request(requestComment)

    const id = options.id
    let page = this

    let tableName = 'stories'
    let Story = new wx.BaaS.TableObject(tableName)
    let recordID = id

    Story.get(recordID).then(res => {
      page.setData({
        story: res.data
      })
      console.log("story: ", res)
    })
    
    let story_id = options.id
    let query = new wx.BaaS.Query()
    query.compare('story_id', '=', story_id)
    
    let Comment = new wx.BaaS.TableObject('comments')
    
    Comment.setQuery(query).find().then(res => {
      page.setData({
        comment: res.data.objects
      }) 
      console.log("comment", res)
    })
  },

  voteComment(event) {
    const page = this

    const data = event.currentTarget.dataset
    const votes = data.votes
    const new_votes = { votes: votes + 1 }


    // make a PUT request
    wx.request({
      url: `https://cloud.minapp.com/oserve/v1/table/85188/record/${data.id}`,
      method: 'PUT',
      header: { 'Authorization': 'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e' }, // API key from Above
      data: new_votes,

      success(res) {
        // set comment data
        console.log(res)
      }
    })
  },
  // getResult(res) {
  //   console.log(res)
  //   this.setData({
  //     story: res.data
  //   })
  // },

  // getComment(res) {
  //   console.log(res)
  //   this.setData({
  //     comment: res.data
  //   })
  // },

  formSubmit(event) {
    let page = this
    let content = event.detail.value
    
    let data = {
      story_id: page.data.story.id,
      content: content,
      name: 'Anonymous',
      votes: 0
    }

    //const data = event.currentTarget.dataset
    let tableName = 'comments'
    let Comment = new wx.BaaS.TableObject(tableName)
    let comment = Comment.create()

    console.log("new comment", comment)

    comment.set(data).save().then(res => {
      console.log(res)
      console.log("data content", data.content)

      const comment = res.data
      let comments = page.data.comments
      comments.push(comment)
      page.setData({comments: comment})
    })
    // wx.request({
    //   url: 'https://cloud.minapp.com/oserve/v1/table/85188/record/',
    //   header: { 'Authorization': 'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e' },
    //   data: comment,
    //   method: 'POST',
    //   success: this.submitSuccess
    // })
  },

  submitSuccess(res) {
    if (res.statusCode === 201) {
      wx.reLaunch()
      wx.showToast({
        title: 'Comment added',
        icon: 'success'
      })
    }
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})