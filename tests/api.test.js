"use strict";

const request = require("supertest");
const expect = require("expect.js");

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

const app = require("../src/app")(db);
const buildSchemas = require("../src/schemas");

describe("API tests", () => {
  before(done => {
    db.serialize(err => {
      if (err) {
        return done(err);
      }

      buildSchemas(db);

      done();
    });
  });

  after(() => {
    db.close();
  });

  describe("App Test", () => {
    describe("GET /health", () => {
      it("should return health", done => {
        request(app)
          .get("/health")
          .expect("Content-Type", /text/)
          .expect(200, done);
      });
    });

    describe("POST /rides", () => {
      beforeEach(() => {
        db.run(`DELETE FROM Rides`, err => {
          if (err) throw err;
        });
      });

      describe("all params are correct", () => {
        it("should return rides detail", done => {
          request(app)
            .post("/rides")
            .send({
              start_lat: 0,
              start_long: 1,
              end_lat: 2,
              end_long: 3,
              rider_name: "Jancuk",
              driver_name: "Jancuk 2",
              driver_vehicle: "Motor"
            })
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);

              expect(res.body).to.be.an("array");
              expect(res.body).to.have.length(1);
              expect(res.body[0].startLat).to.be.equal(0);
              expect(res.body[0].startLong).to.be.equal(1);
              expect(res.body[0].endLat).to.be.equal(2);
              expect(res.body[0].endLong).to.be.equal(3);
              expect(res.body[0].riderName).to.be.equal("Jancuk");
              expect(res.body[0].driverName).to.be.equal("Jancuk 2");
              expect(res.body[0].driverVehicle).to.be.equal("Motor");
              return done();
            });
        });
      });

      describe("start latitude and longitude are invalid", () => {
        it("should return validation error", done => {
          request(app)
            .post("/rides")
            .send({
              start_lat: 181,
              start_long: 1,
              end_lat: 2,
              end_long: 3,
              rider_name: "Jancuk",
              driver_name: "Jancuk 2",
              driver_vehicle: "Motor"
            })
            .expect("Content-Type", /json/)
            .expect(
              200,
              {
                error_code: "VALIDATION_ERROR",
                message:
                  "Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively"
              },
              done
            );
        });
      });

      describe("end latitude and longitude are invalid", () => {
        it("should return validation error", done => {
          request(app)
            .post("/rides")
            .send({
              start_lat: 0,
              start_long: 1,
              end_lat: 181,
              end_long: 3,
              rider_name: "Jancuk",
              driver_name: "Jancuk 2",
              driver_vehicle: "Motor"
            })
            .expect("Content-Type", /json/)
            .expect(
              200,
              {
                error_code: "VALIDATION_ERROR",
                message:
                  "End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively"
              },
              done
            );
        });
      });

      describe("rider name are invalid", () => {
        it("should return validation error", done => {
          request(app)
            .post("/rides")
            .send({
              start_lat: 0,
              start_long: 1,
              end_lat: 2,
              end_long: 3,
              rider_name: "",
              driver_name: "Jancuk 2",
              driver_vehicle: "Motor"
            })
            .expect("Content-Type", /json/)
            .expect(
              200,
              {
                error_code: "VALIDATION_ERROR",
                message: "Rider name must be a non empty string"
              },
              done
            );
        });
      });

      describe("driver name are invalid", () => {
        it("should return validation error", done => {
          request(app)
            .post("/rides")
            .send({
              start_lat: 0,
              start_long: 1,
              end_lat: 2,
              end_long: 3,
              rider_name: "Jancuk",
              driver_name: "",
              driver_vehicle: "Motor"
            })
            .expect("Content-Type", /json/)
            .expect(
              200,
              {
                error_code: "VALIDATION_ERROR",
                message: "Driver name must be a non empty string"
              },
              done
            );
        });
      });

      describe("driver vehicle are invalid", () => {
        it("should return validation error", done => {
          request(app)
            .post("/rides")
            .send({
              start_lat: 0,
              start_long: 1,
              end_lat: 2,
              end_long: 3,
              rider_name: "Jancuk",
              driver_name: "Jancuk 2",
              driver_vehicle: ""
            })
            .expect("Content-Type", /json/)
            .expect(
              200,
              {
                error_code: "VALIDATION_ERROR",
                message: "Driver vehicle must be a non empty string"
              },
              done
            );
        });
      });
    });

    describe("GET /rides", () => {
      beforeEach(() => {
        db.run(`DELETE FROM Rides`, err => {
          if (err) throw err;
        });
      });

      describe("at least 1 ride exists", () => {
        it("should return found rides", done => {
          const record = [1, 0, 1, 2, 3, "Jancuk", "Jancuk 2", "Motor"];

          db.run(
            "INSERT INTO Rides(rideID, startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            record,
            function(err) {
              if (err) {
                throw err;
              }
            }
          );
          
          request(app)
            .get("/rides")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);

              expect(res.body).to.be.an("array");
              expect(res.body).to.have.length(1);
              expect(res.body[0].startLat).to.be.equal(0);
              expect(res.body[0].startLong).to.be.equal(1);
              expect(res.body[0].endLat).to.be.equal(2);
              expect(res.body[0].endLong).to.be.equal(3);
              expect(res.body[0].riderName).to.be.equal("Jancuk");
              expect(res.body[0].driverName).to.be.equal("Jancuk 2");
              expect(res.body[0].driverVehicle).to.be.equal("Motor");
              return done();
            });
        });
      });

      describe("no ride exists", () => {
        it("should return not found error", done => {
          request(app)
            .get("/rides")
            .expect("Content-Type", /json/)
            .expect(
              200,
              {
                error_code: "RIDES_NOT_FOUND_ERROR",
                message: "Could not find any rides"
              },
              done
            );
        });
      });
    });
  });
});
