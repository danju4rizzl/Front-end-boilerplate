class storage {
  private namespace = 'showwcase_';
  private strategy: Storage | undefined;

  constructor() {
    if (typeof window !== 'undefined') {
      this.strategy = localStorage ? localStorage : sessionStorage;
    }
  }

  public name(key: string) {
    return `${this.namespace}${key}`;
  }

  // localStorage wrapper
  public set(key: string, value: unknown) {
    if (!this.strategy) return null;
    this.strategy.setItem(this.name(key), JSON.stringify(value));
  }

  public put(key: string, value: unknown) {
    if (!this.strategy) return null;

    if (!this.get(key)) {
      this.strategy.setItem(this.name(key), JSON.stringify(value));
    } else {
      return false;
    }
  }

  public get(key: string): unknown {
    if (!this.strategy) return null;
    try {
      return JSON.parse(this.strategy.getItem(this.name(key)) || '');
    } catch (err) {
      return this.strategy.getItem(this.name(key));
    }
  }

  public delete(key: string) {
    if (!this.strategy) return null;

    this.strategy.removeItem(this.name(key));
  }

  public clear() {
    if (!this.strategy) return null;

    this.strategy.clear();
  }
}

// Singleton instance
export default new storage();
