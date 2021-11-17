

interface IPost {
    id?: number,
    title: string,
    author: string,
    content: string,
    date: string,
    tags?: Array<String>,
}
  export default IPost