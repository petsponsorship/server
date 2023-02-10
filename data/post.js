let posts = [
  {
    id: "1",
    text: "Hello",
    createdAt: Date.now().toString(),
  },
  {
    id: "2",
    text: "Hello2",
    createdAt: Date.now().toString(),
  },
];

export async function getAll() {
  return posts;
}

export async function getById(id) {
  return posts.find((post) => post.id === id);
}

export async function create(text) {
  const post = {
    id: Date.now().toString(),
    text,
    createdAt: Date.now().toString(),
  };
  posts = [post, ...posts];
  return posts;
}

export async function update(id, text) {
  const post = posts.find((post) => post.id === id);
  if (post) return (post.text = text);
  return post;
}

export async function remove(id) {
  posts = posts.filter((post) => post.id !== id);
}
