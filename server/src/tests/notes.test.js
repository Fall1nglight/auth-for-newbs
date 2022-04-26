const request = require('supertest');
const { expect } = require('chai');

const app = require('../app');
const db = require('../db/connection');

const notes = db.get('notes');

let token;
let noteId;

const signupRoute = '/auth/signup';
const notesRoute = '/api/v1/notes';

const newUser = {
  username: 'testUser02',
  password: '0123456789',
};

const newNote = {
  title: 'Test note',
  note: 'This is a test note.',
};

describe(`POST ${signupRoute}`, () => {
  before(async () => {
    try {
      await notes.remove({});
    } catch (error) {
      console.error(error);
    }
  });

  it('should create a new user for testing notes', async () => {
    const response = await request(app)
      .post(signupRoute)
      .send(newUser)
      .expect(200);

    expect(response.body).to.have.property('token');

    token = response.body.token;
  });
});

describe(`POST ${notesRoute}`, () => {
  it('should only allow logged in users to create notes', async () => {
    const response = await request(app).post(notesRoute).expect(401);

    expect(response.body.message).to.equal('Un-Authorized request');
  });

  it('should require a title', async () => {
    const response = await request(app)
      .post(notesRoute)
      .send({ note: newNote.note })
      .set('Authorization', `Bearer ${token}`)
      .expect(422);

    expect(response.body.message).to.equal('"title" is required');
  });

  it('should require a note (property)', async () => {
    const response = await request(app)
      .post(notesRoute)
      .send({ title: newNote.title })
      .set('Authorization', `Bearer ${token}`)
      .expect(422);

    expect(response.body.message).to.equal('"note" is required');
  });

  it('should create a new note', async () => {
    const response = await request(app)
      .post(notesRoute)
      .send(newNote)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).to.have.property('newNote');
  });
});

describe('GET /api/v1/notes/', () => {
  it('should only allow logged in users to visit notes', async () => {
    const response = await request(app).get(notesRoute).expect(401);

    expect(response.body.message).to.equal('Un-Authorized request');
  });

  it('should only allow logged in users to visit notes', async () => {
    const response = await request(app)
      .get(notesRoute)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).to.have.property('userNotes');

    noteId = response.body.userNotes[0]._id;
  });
});

describe(`PATCH ${notesRoute}`, () => {
  it('should only allow logged in users to update notes', async () => {
    const response = await request(app)
      .patch(`${notesRoute}/${noteId}`)
      .expect(401);

    expect(response.body.message).to.equal('Un-Authorized request');
  });

  it('should require title / note / public', async () => {
    const response = await request(app)
      .patch(`${notesRoute}/${noteId}`)
      .send({})
      .set('Authorization', `Bearer ${token}`)
      .expect(422);

    expect(response.body.message).to.equal(
      '"value" must contain at least one of [title, note, public]'
    );
  });

  it('should update title public', async () => {
    const response = await request(app)
      .patch(`${notesRoute}/${noteId}`)
      .send({ ...newNote, title: 'Updated title' })
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).to.have.property('updatedNote');
  });

  it('should update note property', async () => {
    const response = await request(app)
      .patch(`${notesRoute}/${noteId}`)
      .send({ ...newNote, note: 'Update note content' })
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).to.have.property('updatedNote');
  });

  it('should update public property', async () => {
    const response = await request(app)
      .patch(`${notesRoute}/${noteId}`)
      .send({ ...newNote, public: true })
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).to.have.property('updatedNote');
  });
});

describe(`DELETE ${notesRoute}`, () => {
  it('should only allow logged in users to delete notes', async () => {
    const response = await request(app)
      .delete(`${notesRoute}/${noteId}`)
      .expect(401);

    expect(response.body.message).to.equal('Un-Authorized request');
  });

  it('should delete the test note', async () => {
    const response = await request(app)
      .delete(`${notesRoute}/${noteId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).to.have.property('success', true);
  });
});
