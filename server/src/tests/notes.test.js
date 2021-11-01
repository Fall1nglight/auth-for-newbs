const request = require('supertest');
const { expect } = require('chai');

const app = require('../app');
const db = require('../db/connection');

const notes = db.get('notes');

const newUser = {
  username: 'testUser02',
  password: '0123456789',
};

const newNote = {
  title: 'Test note',
  note: 'This is a test note.',
};

let token = '';
let noteId = '';

describe('POST /auth/signup', () => {
  before(async () => {
    try {
      await notes.remove({});
    } catch (error) {
      console.error(error);
    }
  });

  it('should create a new user for testing notes', async () => {
    const signupResponse = await request(app)
      .post('/auth/signup')
      .send(newUser)
      .expect(200);

    expect(signupResponse.body).to.have.property('token');

    token = signupResponse.body.token;
  });
});

describe('POST /api/v1/notes', () => {
  it('should require a title', async () => {
    const response = await request(app)
      .post('/api/v1/notes')
      .send({ note: newNote.note })
      .set('Authorization', `Bearer ${token}`)
      .expect(422);

    expect(response.body.message).to.equal('"title" is required');
  });

  it('should require a note (property)', async () => {
    const response = await request(app)
      .post('/api/v1/notes')
      .send({ title: newNote.title })
      .set('Authorization', `Bearer ${token}`)
      .expect(422);

    expect(response.body.message).to.equal('"note" is required');
  });

  it('should create a new note', async () => {
    const response = await request(app)
      .post('/api/v1/notes')
      .send(newNote)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).to.have.property('success', true);
  });
});

describe('GET /api/v1/notes/', () => {
  it('should only allow logged in users to visit notes', async () => {
    const response = await request(app).get('/api/v1/notes').expect(401);

    expect(response.body.message).to.equal('Un-Authorized request');
  });

  it('should only allow logged in users to visit notes', async () => {
    const response = await request(app)
      .get('/api/v1/notes')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).to.have.property('userNotes');

    noteId = response.body.userNotes[0]._id;
  });
});

describe('PATCH /api/v1/notes', () => {
  it('should require title / note / reminder', async () => {
    const response = await request(app)
      .patch(`/api/v1/notes/${noteId}`)
      .send({})
      .set('Authorization', `Bearer ${token}`)
      .expect(422);

    expect(response.body.message).to.equal(
      '"value" must contain at least one of [title, note, reminder]'
    );
  });

  it('should update title', async () => {
    const response = await request(app)
      .patch(`/api/v1/notes/${noteId}`)
      .send({ ...newNote, title: 'Updated title' })
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).to.have.property('success', true);
  });

  it('should update note (property)', async () => {
    const response = await request(app)
      .patch(`/api/v1/notes/${noteId}`)
      .send({ ...newNote, note: 'Update note content' })
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).to.have.property('success', true);
  });

  it('should update reminder', async () => {
    const response = await request(app)
      .patch(`/api/v1/notes/${noteId}`)
      .send({ ...newNote, reminder: true })
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).to.have.property('success', true);
  });
});

describe('DELETE /api/v1/notes', () => {
  it('should delete the test note', async () => {
    const response = await request(app)
      .delete(`/api/v1/notes/${noteId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).to.have.property('success', true);
  });
});
