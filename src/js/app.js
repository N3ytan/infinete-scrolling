let page = 1

const getPosts = async () => {
   const responde = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`)
   const data = responde.json()
   console.log(data)
}

getPosts()

