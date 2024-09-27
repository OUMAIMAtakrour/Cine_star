const request = require("supertest");
const express = require("express");
const ReservationController = require("../controllers/reservationController");
const ReservationService = require("../services/reservationService");

const app = express();
app.use(express.json());

jest.mock("../services/reservationService");

const reservationService = new ReservationService();
const reservationController = new ReservationController(reservationService);

app.post("/create", (req, res) => reservationController.store(req, res));
app.delete("/reservations/:id", (req, res) => reservationController.destroy(req, res));
app.get("/reservations", (req, res) => reservationController.index(req, res));
app.get("/reservations/:id", (req, res) => reservationController.show(req, res));
app.put("/reservations/:id", (req, res) => reservationController.update(req, res));

describe("ReservationController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should create a reservation", async () => {
    const mockReservation = { id: 1, seatIds: [1, 2] };
    reservationService.store.mockResolvedValue(mockReservation);

    const response = await request(app)
      .post("/create")
      .send({ seatIds: [1, 2] });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockReservation);
  });

  test("should return 400 if seatIds is not an array", async () => {
    const response = await request(app)
      .post("/reservations")
      .send({ seatIds: "not an array" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "seatIds must be an array" });
  });

  test("should delete a reservation", async () => {
    reservationService.destroy.mockResolvedValue();

    const response = await request(app)
      .delete("/reservations/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Reservation deleted successfully" });
  });

  test("should get all reservations", async () => {
    const mockReservations = [{ id: 1 }, { id: 2 }];
    reservationService.index.mockResolvedValue(mockReservations);

    const response = await request(app)
      .get("/reservations");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockReservations);
  });

  test("should get a reservation by id", async () => {
    const mockReservation = { id: 1, seatIds: [1, 2] };
    reservationService.show.mockResolvedValue(mockReservation);

    const response = await request(app)
      .get("/reservations/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockReservation);
  });

  test("should return 404 if reservation not found", async () => {
    reservationService.show.mockResolvedValue(null);

    const response = await request(app)
      .get("/reservations/999");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Reservation not found" });
  });

  test("should update a reservation", async () => {
    const mockUpdatedReservation = { id: 1, seatIds: [3, 4] };
    reservationService.update.mockResolvedValue(mockUpdatedReservation);

    const response = await request(app)
      .put("/reservations/1")
      .send({ seatIds: [3, 4] });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUpdatedReservation);
  });
});
