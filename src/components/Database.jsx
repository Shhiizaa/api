export default function Database({ email, password }) {
  fetch("http://localhost:5001/users")
    .then((response) => response.json())
    .then((users) => {
      const maxId = Math.max(...users.map((user) => user.id));
      const newUser = { id: maxId + 1, email, password, createdAt: Date.now() };

      fetch("http://localhost:5001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      }).then((r) => r.json());
    });
}
