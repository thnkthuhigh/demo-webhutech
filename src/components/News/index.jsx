import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Box,
  CardMedia,
} from "@mui/material";

// Dữ liệu mẫu cho Tin Tức và Ưu Đãi
const sampleNews = [
  {
    id: 1,
    title: "Tin Tức 1: Mới ra mắt bộ phim hot",
    content:
      "Chúng tôi rất vui mừng thông báo về việc ra mắt bộ phim mới, với những cảnh quay hấp dẫn và dàn diễn viên nổi tiếng. Hãy cùng chúng tôi trải nghiệm!",
    img: "https://via.placeholder.com/300x150",
  },
  {
    id: 2,
    title: "Tin Tức 2: Sự kiện đặc biệt tháng này",
    content:
      "Tháng này, chúng tôi tổ chức một sự kiện đặc biệt với các hoạt động hấp dẫn. Đừng bỏ lỡ cơ hội tham gia và nhận những phần quà giá trị.",
    img: "https://via.placeholder.com/300x150",
  },
  {
    id: 3,
    title: "Tin Tức 3: Những bộ phim đang chiếu",
    content:
      "Khám phá các bộ phim đang chiếu tại các rạp, từ hành động đến lãng mạn, chắc chắn bạn sẽ tìm thấy một bộ phim phù hợp với sở thích của mình.",
    img: "https://via.placeholder.com/300x150",
  },
];

const samplePromotions = [
  {
    id: 1,
    title: "Ưu Đãi 1: Giảm giá 50% vé xem phim",
    description:
      "Nhanh tay đặt vé trước để nhận ưu đãi giảm giá 50% cho tất cả các bộ phim trong tháng này. Ưu đãi có giới hạn!",
    img: "https://via.placeholder.com/300x150",
  },
  {
    id: 2,
    title: "Ưu Đãi 2: Thẻ thành viên miễn phí",
    description:
      "Đăng ký thẻ thành viên của chúng tôi ngay hôm nay để nhận nhiều ưu đãi đặc biệt và vé mời miễn phí cho các sự kiện.",
    img: "https://via.placeholder.com/300x150",
  },
  {
    id: 3,
    title: "Ưu Đãi 3: Mua 1 tặng 1 vé xem phim",
    description:
      "Mua một vé xem phim và nhận ngay một vé miễn phí cho người bạn đồng hành. Cơ hội có 1-0-2, đừng bỏ lỡ!",
    img: "https://via.placeholder.com/300x150",
  },
];

export default function PromotionsAndNews() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tin Tức & Ưu Đãi
      </Typography>

      {/* Section for News */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Tin Tức Mới
      </Typography>
      <Grid container spacing={3}>
        {sampleNews.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                height="140"
                image={item.img}
                alt={item.title}
              />
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {item.content.substring(0, 100)}...
                </Typography>
                <Box sx={{ marginTop: "auto", paddingTop: 2 }}>
                  <Button variant="contained" sx={{ width: "100%" }}>
                    Xem Chi Tiết
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Section for Promotions */}
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Ưu Đãi Hiện Tại
      </Typography>
      <Grid container spacing={3}>
        {samplePromotions.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                height="140"
                image={item.img}
                alt={item.title}
              />
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {item.description.substring(0, 100)}...
                </Typography>
                <Box sx={{ marginTop: "auto", paddingTop: 2 }}>
                  <Button variant="contained" sx={{ width: "100%" }}>
                    Nhận Ưu Đãi
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
