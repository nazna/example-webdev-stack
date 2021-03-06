import config from 'config'
import request from 'supertest'
import app, { db } from '../main'

const { version } = config.get('backend')

describe(`GET /${version}/authors`, () => {
  test('should success', async (done) => {
    // setup
    expect.assertions(2)

    // when
    const response = await request(app).get(`/${version}/authors`)

    // then
    expect(response.status).toEqual(200)
    expect(response.header['content-type']).toMatch(/application\/json/)

    done()
  })

  test('no data should fail with 404', async (done) => {
    // setup
    expect.assertions(2)

    const temp = db.getState()
    db.__wrapped__ = { authors: [] }

    // when
    const response = await request(app).get(`/${version}/authors`)

    // then
    expect(response.status).toEqual(404)
    expect(response.header['content-type']).toMatch(/text\/plain/)

    db.__wrapped__ = temp
    done()
  })

  test('when panic happened', async (done) => {
    // setup
    expect.assertions(2)

    const temp = db.get
    db.get = undefined

    // when
    const response = await request(app).get(`/${version}/authors`)

    // then
    expect(response.status).toEqual(500)
    expect(response.header['content-type']).toMatch(/text\/plain/)

    db.get = temp
    done()
  })
})

describe(`GET /${version}/authors/:authorId`, () => {
  test('should success', async (done) => {
    // setup
    expect.assertions(2)

    const authorId = 1

    // when
    const response = await request(app).get(`/${version}/authors/${authorId}`)

    // then
    expect(response.status).toEqual(200)
    expect(response.header['content-type']).toMatch(/application\/json/)

    done()
  })

  test('invaid authorId should fail with 400', async (done) => {
    // setup
    expect.assertions(2)

    const authorId = 'not-a-number'

    // when
    const response = await request(app).get(`/${version}/authors/${authorId}`)

    // then
    expect(response.status).toEqual(400)
    expect(response.header['content-type']).toMatch(/text\/plain/)

    done()
  })

  test('no data should fail with 404', async (done) => {
    // setup
    expect.assertions(2)

    const authorId = -1

    // when
    const response = await request(app).get(`/${version}/authors/${authorId}`)

    // then
    expect(response.status).toEqual(404)
    expect(response.header['content-type']).toMatch(/text\/plain/)

    done()
  })

  test('when panic happened', async (done) => {
    // setup
    expect.assertions(2)

    const temp = db.get
    db.get = undefined

    const authorId = 1

    // when
    const response = await request(app).get(`/${version}/authors/${authorId}`)

    // then
    expect(response.status).toEqual(500)
    expect(response.header['content-type']).toMatch(/text\/plain/)

    db.get = temp
    done()
  })
})
