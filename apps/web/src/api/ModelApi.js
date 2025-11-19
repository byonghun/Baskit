const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:3001";
const API_V1_BASE_URL = `${API_BASE_URL}/api/v1`;

export class ModelApi {
  constructor(model) {
    this.model = model;
  }

  async listAll() {
    return fetch(`${API_V1_BASE_URL}/${this.model}`).then((res) => res.json());
  }

  async get(id) {
    return fetch(`${API_V1_BASE_URL}/${this.model}/${id}`).then((res) => res.json());
  }

  async create(data) {
    return fetch(`${API_V1_BASE_URL}/${this.model}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }

  async update(id, data) {
    return fetch(`${API_V1_BASE_URL}/${this.model}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }

  async remove(id) {
    return fetch(`${API_V1_BASE_URL}/${this.model}/${id}`, {
      method: "DELETE",
    });
  }

  async deleteAll() {
    return fetch(`${API_V1_BASE_URL}/${this.model}`, {
      method: "DELETE",
    });
  }
}
