export class Store {
  constructor(initialState = {}) {
    this._state = initialState;
    this._listeners = {};
  }

  getState() {
    return { ...this._state };
  }

  setState(partial) {
    const prev = this._state;
    this._state = { ...this._state, ...partial };
    Object.keys(partial).forEach((key) => {
      if (this._listeners[key]) {
        this._listeners[key].forEach((fn) => fn(this._state[key], prev[key]));
      }
    });
    if (this._listeners["*"]) {
      this._listeners["*"].forEach((fn) => fn(this._state, prev));
    }
  }

  on(key, fn) {
    if (!this._listeners[key]) this._listeners[key] = [];
    this._listeners[key].push(fn);
    return () => {
      this._listeners[key] = this._listeners[key].filter((f) => f !== fn);
    };
  }
}

export const store = new Store({
  products: [],
  cart: [],
  category: "All",
  sortBy: "default",
  searchQuery: "",
  isCartOpen: false,
  isLoading: true,
});
