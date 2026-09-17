# EduMotion

EduMotion là ứng dụng web hỗ trợ học sinh tiểu học trả lời câu hỏi bằng cử chỉ cơ thể. Ứng dụng sử dụng webcam, p5.js và ml5.js PoseNet để nhận diện tư thế, hiển thị bộ xương ảo và phản hồi kết quả theo thời gian thực.

## Thành viên

| Họ và tên | MSSV | Email |
|---|---|---|
| Nguyễn Tất Tài | 2311558489 | 2311558489@nttu.edu.vn |
| Phan Công Luận | 2311559057 | 2311559057@nttu.edu.vn |

## Chức năng chính

- Nhận diện cử chỉ bằng webcam và PoseNet.
- Ánh xạ cử chỉ thành đáp án:
  - A: Giơ tay trái.
  - B: Giơ tay phải.
  - C: Giơ hai tay.
  - D: Squat.
  - Sai: Nghiêng trái.
  - Đúng: Nghiêng phải.
- Hỗ trợ 3 môn học:
  - Toán.
  - Tiếng Việt.
  - Tiếng Anh.
- Mỗi môn có ngân hàng 20 câu hỏi.
- Mỗi lượt chọn ngẫu nhiên 10 câu, không lặp trong cùng lượt.
- Hiển thị điểm, số câu đúng, thời gian, FPS và độ trễ phản hồi.
- Có màn hình chọn môn trước khi chơi.
- Có các nút chơi tiếp và chơi lại sau khi hoàn thành lượt.
- Hỗ trợ tiếng Việt và English.
- Hỗ trợ dark mode.
- Hỗ trợ âm thanh phản hồi đúng/sai.
- Có chế độ bàn phím hỗ trợ A, B, C, D.
- Giới hạn tối đa 3 lần squat trong một lượt.
- Lưu lịch sử 5 lượt chơi gần nhất bằng `localStorage`.
- Tự động xuất báo cáo HTML sau khi hoàn thành 10 câu.

## Cử chỉ nhận diện

| Cử chỉ | Kết quả |
|---|---|
| Giơ tay trái | A |
| Giơ tay phải | B |
| Giơ hai tay | C |
| Squat | D |
| Nghiêng trái | Sai |
| Nghiêng phải | Đúng |

Cử chỉ cần được giữ ổn định trong nhiều khung hình trước khi hệ thống xác nhận.

## Công nghệ

- HTML5.
- CSS3.
- JavaScript thuần.
- p5.js 0.9.0.
- p5.dom.js 0.9.0.
- ml5.js 0.12.2.
- PoseNet.
- HTML Canvas.
- Web Audio API.
- Local Storage.

## Cấu trúc dự án

```text
pose_camera/
├── pose_index.html   # Giao diện và CSS
├── sketch.js         # Camera, PoseNet, game logic và báo cáo
├── ml5.min.js        # Thư viện ml5 cục bộ
├── README.md         # Tài liệu dự án
└── PROJECT_INFO.md   # Thông tin nhóm và mô tả ngắn
```

## Cách chạy

### Cách 1: Live Server trong VS Code

1. Mở thư mục dự án trong VS Code.
2. Cài extension `Live Server` nếu chưa có.
3. Nhấp phải vào `pose_index.html`.
4. Chọn **Open with Live Server**.
5. Cho phép trình duyệt truy cập webcam.

### Cách 2: Mở trực tiếp

Có thể mở `pose_index.html` trực tiếp bằng trình duyệt. Tuy nhiên, chạy qua `localhost` được khuyến nghị để quyền webcam và việc tải thư viện hoạt động ổn định hơn.

## Quy trình sử dụng

1. Chọn môn học ở màn hình bắt đầu.
2. Nhấn **Bắt đầu**.
3. Cho phép trình duyệt sử dụng webcam.
4. Đứng cách màn hình khoảng 1,5 m và để đủ khoảng trống xung quanh.
5. Thực hiện cử chỉ tương ứng với đáp án.
6. Giữ cử chỉ cho đến khi thanh tiến trình hoàn tất.
7. Sau 10 câu, hệ thống hiển thị kết quả và tự tải báo cáo HTML.

## Báo cáo sau lượt chơi

Sau khi hoàn thành 10 câu, hệ thống tạo file dạng:

```text
edumotion-<subject>-<timestamp>.html
```

Báo cáo gồm:

- Môn học và ngôn ngữ.
- Tổng điểm và số câu đúng.
- Thời gian vận động.
- FPS trung bình và FPS thấp nhất.
- Độ trễ phản hồi.
- Ảnh canvas sau từng câu.
- Đáp án đã chọn và đáp án đúng.

## Quyền riêng tư và giới hạn

- Camera được xử lý ở phía trình duyệt.
- Dự án hiện không có backend, REST API hoặc cơ sở dữ liệu.
- Không gửi ảnh, video hoặc tọa độ khung xương lên máy chủ ứng dụng.
- Ảnh dùng trong báo cáo được tạo cục bộ bằng canvas và nhúng vào file HTML tải xuống.
- Thư viện ml5.js hiện được tải từ CDN trong `pose_index.html`; file `ml5.min.js` cũng được giữ trong thư mục dự án.
- Độ chính xác nhận diện phụ thuộc ánh sáng, khoảng cách, góc camera và chất lượng webcam.

## Tham số nhận diện hiện tại

| Tham số | Giá trị đang dùng |
|---|---:|
| Ngưỡng tin cậy keypoint | 0,35 |
| Khoảng cổ tay cao hơn vai | 18 px trên ảnh 640×480 |
| Ngưỡng nghiêng thân | Tỷ lệ 0,28 |
| Độ hạ hông khi squat | 8% chiều cao ảnh |
| Góc gối squat | ≤ 155° |
| Thời gian giữ | 45 khung hình |
| Số squat tối đa mỗi lượt | 3 |

## Giấy phép

Dự án được xây dựng cho mục đích học tập và nghiên cứu.
