import {useState} from "react";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Select, SelectItem} from "@/components/ui/select";

const cinemas = [
  {id: 1, name: "CGV Hùng Vương Plaza"},
  {id: 2, name: "CGV Crescent Mall"},
  {id: 3, name: "CGV Vincom Thủ Đức"},
];

const movies = {
  1: [
    {
      id: 101,
      title: "Nàng Bạch Tuyết",
      showtimes: ["08:50 AM", "11:30 AM", "16:00 PM"],
    },
    {id: 102, title: "Cô Gái Năm Ấy", showtimes: ["12:50 PM"]},
  ],
  2: [
    {id: 103, title: "Nghề Siêu Khó", showtimes: ["11:50 AM", "14:00 PM"]},
    {id: 104, title: "Yêu Vì Tiền", showtimes: ["20:40 PM"]},
  ],
  3: [{id: 105, title: "Siêu Anh Hùng", showtimes: ["10:00 AM", "13:00 PM"]}],
};

export default function MovieSchedule() {
  const [selectedCinema, setSelectedCinema] = useState(cinemas[0].id);
  const [showUpcoming, setShowUpcoming] = useState(false);

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Lịch Chiếu Phim</h1>
      <Select
        value={selectedCinema}
        onChange={(e) => setSelectedCinema(Number(e.target.value))}>
        {cinemas.map((cinema) => (
          <SelectItem key={cinema.id} value={cinema.id}>
            {cinema.name}
          </SelectItem>
        ))}
      </Select>

      <div className='grid gap-4 mt-4'>
        {movies[selectedCinema].map((movie) => (
          <Card key={movie.id}>
            <CardContent>
              <h2 className='text-xl font-semibold'>{movie.title}</h2>
              <p className='text-gray-600'>
                Suất chiếu: {movie.showtimes.join(", ")}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button className='mt-6' onClick={() => setShowUpcoming(!showUpcoming)}>
        {showUpcoming ? "Xem Phim Đang Chiếu" : "Xem Phim Sắp Chiếu"}
      </Button>
    </div>
  );
}
