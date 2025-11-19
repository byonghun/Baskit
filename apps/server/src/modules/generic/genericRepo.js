const memoryDB = {
  assets: [],
  users: [],
  items: [],
};

class GenericRepo {
  constructor(model) {
    this.table = model;

    if (!memoryDB[this.table]) {
      memoryDB[this.table] = [];
    }
  }

  list() {
    const data = memoryDB[this.table];
    return { count: data.length, data };
  }

  get(id) {
    return memoryDB[this.table].find((item) => item.id == id);
  }

  create(data) {
    const newItem = { id: Date.now(), ...data };
    memoryDB[this.table].push(newItem);
    return newItem;
  }

  update(id, data) {
    const modelTable = memoryDB[this.table];
    const index = modelTable.findIndex((item) => item.id == id);
    if (index !== -1) {
      modelTable[index] = { ...modelTable[index], ...data };
      return modelTable[index];
    }
    return null;
  }

  delete(id) {
    const modelTable = memoryDB[this.table];
    const index = modelTable.findIndex((item) => item.id == id);
    if (index !== -1) {
      modelTable.splice(index, 1);
      return true;
    }
    return false;
  }

  deleteAll() {
    memoryDB[this.table] = [];
  }
}

export default GenericRepo;
