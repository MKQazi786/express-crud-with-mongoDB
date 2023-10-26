window.createPost = (event) => {

    event.preventDefault()

    let postTitle = document.getElementById("postTitle").value;
    let postText = document.getElementById("postText").value;

    axios.post(`/api/v1/post`, {
        title: postTitle,
        text: postText
    })
        .then(function (response) {
            console.log(response.data);
            document.getElementById("result").innerHTML = response.data;
        })
        .catch(function (error) {
            // handle error
            console.log(error.data);
            document.getElementById("result").innerHTML = "error in post"
        })
}

window.getAllPost = (event) => {


    axios.get(`/api/v1/posts`)
        .then(function (response) {
            console.log(response.data);

            let postsHtml = ``
            response.data.map((eachPost) => {
                postsHtml +=
                    `<div id="card-${eachPost.id}" class="post-card">
                    <h3> ${eachPost.title} </h3> 
                    <p> ${eachPost.text} </p>
                    <button onclick="delPost('${eachPost.id}')"> Delete </button>
                    <button onclick="editPost('${eachPost.id}','${eachPost.title}','${eachPost.text}')"> Edit </button>
                </div> 
                <br>`
            })

            document.getElementById("posts").innerHTML = postsHtml;
        })
        .catch(function (error) {
            // handle error
            console.log(error.data);
            document.getElementById("result").innerHTML = "error in post"
        })
}

window.delPost = (postId) => {

        console.log("delete :", postId)

        axios.delete(`/api/v1/post/${postId}`)
            .then(function (response) {
                console.log(response.data);

                getAllPost();
            })
            .catch(function (error) {
                // handle error
                console.log(error.data);
                document.getElementById("result").innerHTML = "error in post"
            })
}

window.editPost = (postId, title, text) => {
        console.log("PostId :", postId)

        document.getElementById(`card-${postId}`).innerHTML += 
        `<form onsubmit="savePost('${postId}')" >
        <br/>
          title: <input type="text" value="${title}" id="title-${postId}" />
          <br/>
          text: <input type="text" value="${text}" id="text-${postId}" />
          <br/>
          <button>Save</button>
        </form>`

}

window.savePost = (postId) => {

        const updatedTitle = document.getElementById(`title-${postId}`).value
        const updatedText = document.getElementById(`text-${postId}`).value

        axios.put(`/api/v1/post/${postId}`, {
            title: updatedTitle,
            text: updatedText
        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                document.getElementById("result").innerHTML = "error in post"
            })
}
