const SessionService = require("../services/sessionService");
const Session = require('../models/session');
const Seat = require('../models/seat');

class SessionController {
  constructor(sessionService) {
    this.sessionService = sessionService;
  }

  async store(req, res) {
    try {
      const session = await this.sessionService.store(req);
      res.status(201).json(session);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      await this.sessionService.destroy(req);
      return res.status(200).json({ message: "Session deleted successfully" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async index(req, res) {
    try {
      const sessions = await this.sessionService.index();
      return res.json(sessions);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async show(req, res) {
    try {
      const session = await this.sessionService.show(req);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
      return res.status(200).json(session);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const session = await this.sessionService.update(req);
      return res.json(session);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  
getSessionWithSeats = async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({ error: 'Invalid session ID' });
    }

    const session = await Session.findById(sessionId)
      .populate('room_id')
      .populate({
        path: 'seats.seat_id',
        model: 'Seat'
      });

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    
    if (!session.seats || session.seats.length === 0) {
      const roomSeats = await Seat.find({ room_id: session.room_id });
      
      session.seats = roomSeats.map(seat => ({
        seat_id: seat._id,
        status: 'Available'
      }));
      
      await session.save();
    }

    
    const formattedSeats = session.seats.map(seat => ({
      _id: seat.seat_id._id,
      isReserved: seat.status === 'Reserved'
    }));

    res.json(formattedSeats);
  } catch (error) {
    console.error('Error fetching session seats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
}

const sessionService = new SessionService();
const sessionController = new SessionController(sessionService);

module.exports = sessionController;
