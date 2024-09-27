const SeatRepository = require("../repositories/implementations/seatRepository.js");
const SeatDao = require("../dao/seatDao.js");

describe("SeatRepository Tests", () => {
  let seatRepository;
  let seatDaoMock;

  beforeEach(() => {
    seatDaoMock = {
      index: jest.fn(),
    };

    seatRepository = new SeatRepository();
    seatRepository.seatDao = seatDaoMock;
  });

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it("should fetch all seats", async () => {
    const mockSeats = [
      { id: 1, room_id: "room1", status: "AVAILABLE" },
      { id: 2, room_id: "room2", status: "RESERVED" },
    ];

    seatDaoMock.index.mockResolvedValue(mockSeats);

    const seats = await seatRepository.index();

    expect(seats).toBeInstanceOf(Array); 
    expect(seats).toEqual(mockSeats); 
    expect(seatDaoMock.index).toHaveBeenCalledTimes(1); 
  });
});
