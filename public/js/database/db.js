import './idb.js'

const dbPromise = idb.open("champions-football", 1, (upgradeDB) => {
  const articleObjectStore = upgradeDB.createObjectStore("teams", {
    keyPath: 'id',
  });
  articleObjectStore.createIndex("name", "name", { unique: true });
});

function addFavorite(teams) {
  dbPromise
    .then((db) => {
      const tx = db.transaction("teams", "readwrite");
      const store = tx.objectStore("teams");

      store.put(teams);
      return tx.complete;
    })
    .then(() => {
      alert('Data berhasil disimpan')
      console.log("Berhasil");
    });
}



function getAll() {
  return new Promise((resolve, reject) => {
    dbPromise
      .then((db) => {
        const tx = db.transaction("teams", "readonly");
        const store = tx.objectStore("teams");

        return store.getAll();
      })
      .then((team) => {
        resolve(team);
      });
  });
}

function Delete(teams){
  dbPromise.then(function(db) {
    var tx = db.transaction('teams', 'readwrite');
    var store = tx.objectStore('teams');

    store.delete(teams.id);
    return tx.complete;
  }).then(function() {
    alert('Item Berhasil Di hapus')
    console.log('Item deleted');
  });
}

export {addFavorite, getAll, Delete}