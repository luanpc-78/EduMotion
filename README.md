# Thông tin dự án EduMotion

## Thành viên nhóm

- Nguyễn Tất Tài
  - MSSV: 2311558489
  - Email: 2311558489@nttu.edu.vn

- Phan Công Luận
  - MSSV: 2311559057
  - Email: 2311559057@nttu.edu.vn

## Tên dự án

EduMotion - Hệ thống hỗ trợ học tập bằng nhận diện cử chỉ cơ thể.

## Mô tả ngắn

EduMotion cho phép học sinh tiểu học trả lời câu hỏi bằng các cử chỉ cơ thể trước webcam. Hệ thống sử dụng PoseNet để nhận diện bộ xương, ánh xạ cử chỉ thành đáp án và phản hồi điểm số theo thời gian thực.

## Công nghệ sử dụng

- HTML5, CSS3, JavaScript.
- p5.js 0.9.0.
- ml5.js 0.12.2.
- PoseNet.
- HTML Canvas.
- Web Audio API.
- Local Storage.

## Thành phần hiện có

- `pose_index.html`: giao diện, CSS, chọn môn, dark mode, ngôn ngữ và điều khiển.
- `sketch.js`: camera, nhận diện PoseNet, ngân hàng câu hỏi, tính điểm, lịch sử lượt chơi và xuất báo cáo.
- `ml5.min.js`: thư viện ml5 cục bộ.
- `README.md`: hướng dẫn sử dụng và mô tả dự án.

## Ghi chú triển khai

Phiên bản hiện tại là ứng dụng client-side. Dự án chưa triển khai Node.js/Express, REST API hoặc hệ quản trị cơ sở dữ liệu. Điểm số và lịch sử gần nhất được lưu cục bộ bằng Local Storage; báo cáo được xuất thành file HTML trên máy người dùng.

## Cách chạy nhanh

Mở thư mục bằng VS Code và chạy `pose_index.html` bằng Live Server. Cho phép trình duyệt sử dụng webcam khi được yêu cầu.
