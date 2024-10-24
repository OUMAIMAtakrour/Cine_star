const ReservationInterface = require("../../repositories/interfaces/reservationInterface");
const ReservationDao = require("../../dao/reservationDao");
const SessionDao = require("../../dao/sessionDao");
const mongoose = require("mongoose");

class ReservationRepository extends ReservationInterface {
  constructor() {
    super();
    this.reservationDao = new ReservationDao();
    this.sessionDao = new SessionDao();
  }

  index() {
    return this.reservationDao.index();
  }

  async store(req) {
    const { seats, sessionId } = req.body;
    const clientId = req.user._id;

    if (!seats || !sessionId) {
      throw new Error("Missing required fields: seats and sessionId are required");
    }

    if (!Array.isArray(seats) || seats.length === 0) {
      throw new Error("Seats must be a non-empty array");
    }

    const isValidSeatStructure = seats.every(seat =>
      seat.row &&
      typeof seat.number === 'number'
    );

    if (!isValidSeatStructure) {
      throw new Error("Each seat must have a row and number property");
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const sessionDoc = await this.sessionDao.show(sessionId);
      if (!sessionDoc) {
        throw new Error("Session not found");
      }

      for (const seat of seats) {
        const sessionSeat = sessionDoc.seats.find(
          s => s.row === seat.row && s.number === seat.number
        );

        if (!sessionSeat) {
          throw new Error(`Invalid seat: row ${seat.row}, number ${seat.number}`);
        }

        if (sessionSeat.status === "Reserved") {
          throw new Error(`Seat already reserved: row ${seat.row}, number ${seat.number}`);
        }
      }

      const updatedSeats = sessionDoc.seats.map(seat => {
        const isReserved = seats.some(
          reservedSeat => 
            reservedSeat.row === seat.row && 
            reservedSeat.number === seat.number
        );

        return {
          row: seat.row,
          number: seat.number,
          status: isReserved ? "Reserved" : seat.status
        };
      });

      await this.sessionDao.update(sessionId, { seats: updatedSeats });

      const reservation = {
        clientId,
        sessionId,
        seats: seats.map(seat => ({
          row: seat.row,
          number: seat.number
        }))
      };

      const savedReservation = await this.reservationDao.save(reservation);

      await session.commitTransaction();
      return savedReservation;

    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }



async show(req) {
  const { id } = req.params;
  if (!id) {
    throw new Error("Reservation ID is required");
  }

  const reservation = await this.reservationDao.show(id);
  if (!reservation) {
    throw new Error("Reservation not found");
  }

  const session = await this.sessionDao.show(reservation.sessionId);
  if (!session) {
    throw new Error("Session not found");
  }

  const seatsWithStatus = reservation.seats.map((reservedSeat) => {
    const sessionSeat = session.seats.find(
      (seat) => seat.row === reservedSeat.row && seat.number === reservedSeat.number
    );

    if (!sessionSeat) {
      return {
        ...reservedSeat,
        status: "Unknown"
      };
    }

    return {
      ...reservedSeat,
      status: sessionSeat.status 
    };
  });

  return {
    ...reservation,
    seats: seatsWithStatus
  };
}


  async destroy(req) {
    const { id } = req.params;
    if (!id) {
      throw new Error("Reservation ID is required");
    }

    const reservation = await this.reservationDao.show(id);
    if (!reservation) {
      throw new Error("Reservation not found");
    }

   
    const session = await this.sessionDao.show(reservation.sessionId);
    if (!session) {
      throw new Error("Session not found");
    }

  
    const updatedSeats = session.seats.map(seat => {
      if (reservation.seats.some(
        reservedSeat => reservedSeat.row === seat.row && 
        reservedSeat.number === seat.number
      )) {
        return { ...seat, status: "Available" };
      }
      return seat;
    });

   
    const mongoSession = await mongoose.startSession();
    mongoSession.startTransaction();

    try {
     
      await this.reservationDao.delete(id);

      
      await this.sessionDao.update(reservation.sessionId, { 
        seats: updatedSeats 
      });

      await mongoSession.commitTransaction();
      return { message: "Reservation deleted successfully" };

    } catch (error) {
      await mongoSession.abortTransaction();
      throw error;
    } finally {
      await mongoSession.endSession();
    }
  }

  async update(req) {
    const { id } = req.params;
    const { clientId, seats, sessionId } = req.body;

    if (!id) {
      throw new Error("Reservation ID is required");
    }

    const reservation = await this.reservationDao.show(id);
    if (!reservation) {
      throw new Error("Reservation not found");
    }

  
    const updatedReservation = {
      clientId: clientId || reservation.clientId,
      sessionId: sessionId || reservation.sessionId,
      seats: seats || reservation.seats
    };

    return await this.reservationDao.update(id, updatedReservation);
  }
}

module.exports = ReservationRepository;