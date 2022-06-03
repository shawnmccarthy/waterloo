import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
chai.should();

chai.use(chaiHttp);

describe('Doctors, Patients and Visits', () => {
    beforeEach((done) => { //Before each test initialize the database to empty
        //db.userList = [];
        done();
    })

    after((done) => { //after this test suite empty the database
        //db.userList = [];
        done();
    })

    //Test the GET route
    describe('/api/v1/doctors/:id', () => {
        it('it should return doctor with id 1', (done) => {
            chai.request(app)
                .get('/api/v1/doctors/1')
                .end((err, res) =>{
                    console.log(JSON.stringify(res.body));
                    res.should.have.status(200);
                    res.body.id.should.be.eql(1);
                })
            done()
        })
    });

    describe('/api/v1/doctors/:id', () => {
        it('it should save doctor with name Doctor Who', (done) => {
            chai.request(app)
                .post('/api/v1/doctors')
                .send({ name: 'Doctor Who'})
                .end((err, res) =>{
                    console.log(JSON.stringify(res.body));
                    res.should.have.status(201);
                    res.body.name.should.be.eql('Doctor Who');
                })
            done()
        })
    });
});
