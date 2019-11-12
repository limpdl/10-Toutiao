// pages/stories/stories.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const id = options.id
    let page = this
    const request = {
      url: `https://cloud.minapp.com/oserve/v1/table/84988/record/${id}`,
      header: { 'Authorization': 'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e' },
      success: page.getResult
    }
    const requestComment = {
      url: 'https://cloud.minapp.com/oserve/v1/table/85188/record/',
      header: { 'Authorization': 'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e' },
      data: {
        where: { // filtering comments for a specific story
          "story_id": { "$eq": id } // story id
        }
      },
      success: page.getComment
    }
    wx.request(request)
    wx.request(requestComment)
    
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
  getResult(res) {
    console.log(res)
    this.setData({
      story: res.data
    })
  },

  getComment(res) {
    console.log(res)
    this.setData({
      comment: res.data
    })
  },

  formSubmit(event) {
    console.log("event", event)
    let comment = {
      story_id: '5d9618bf5721826d1d517e80',
      votes: 1,
      content: 'new comment'
    }
    console.log("new comment", comment)
    //const data = event.currentTarget.dataset

    wx.request({
      url: 'https://cloud.minapp.com/oserve/v1/table/85188/record/',
      header: { 'Authorization': 'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e' },
      data: comment,
      method: 'POST',
      success: this.submitSuccess
    })
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