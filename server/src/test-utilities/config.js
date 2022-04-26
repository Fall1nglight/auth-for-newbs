// app
// semmi kb.

// auth
// before() => törli az összes usert
// létrehoz egy usert, teszten bellül
// elmenti a tokent és később
// ellenőrzi, hogy a /checkuser
// visszatér-e req.user property-vel

// notes
// before() => törli az összes note-ot
// létrehoz egy másik usert, elmenti a tokent
// ellenőrzi, hogy bevan-e lépve a user a token alapján
// létrehoz egy új note-ot
// elmenti a noteId-t
// amivel később műveleteket hajt végre
// PATCH, DELETE
// a végén törli a note-ot

// statistics
// ?

// users
// létrehoz egy admin user-t a helpers.createAdminUser()-el
// elmenti az admin tokent
// létrehoz egy felhasználót
// amin műveleteket hajt végre (PATCH, DELETE)
// a végén törli a user-t

// ? kérdés
// mi lenne a legjobb megoldás
// adatok tárolása a config fileban => kevesebb kód
// minden adat törlése minden egyes teszt előtt

// ! ezt kicsit átgondolni
const routes = {
  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
    checkUser: '/auth/checkuser',
  },

  api: {
    notes: '/api/v1/notes',
    users: '/api/v1/users',

    statistics: {
      numOfNotes: '/num-of-notes',
      editedNotes: '/edited-notes',
      publicNotes: '/public-notes',
    },
  },
};

const testUser = {
  username: 'testUser01',
  password: '0123456789',
};

const adminUser = {
  username: 'adminUser01',
  password: 'passwordpassword',
};

const testNote = {
  title: 'Test note',
  note: 'This is a test note.',
};

module.exports = {
  routes,
  testUser,
  adminUser,
  testNote,
};
