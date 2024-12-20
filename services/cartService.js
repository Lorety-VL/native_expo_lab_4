export default class DatabaseManager {
  constructor(db) {
    this.db = db;
  }

  getAllGoods() {
    return this.db.getAllAsync('SELECT * FROM cart');
  }

  addGood(goodData) {
    return this.db.runAsync(
      'INSERT INTO cart (id, title, image, description, price) VALUES (?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET count=count+1',
      goodData.id,
      goodData.title,
      goodData.image,
      goodData.description,
      goodData.price,
    );
  }
  decreaseGoodCount(goodId) {
    return this.db.runAsync(
      'UPDATE cart SET count = count - 1 WHERE id = ?',
      goodId,
    );
  }
  deleteGood(goodId) {
    return this.db.runAsync(
      'DELETE FROM cart WHERE id = ?',
      goodId,
    );
  }
}