# ⚔️ AoV-change-image-tool
**Công cụ đổi ảnh load trận Liên Quân Mobile (AoV)**

> ⚠️ **DISCLAIMER - CẢNH BÁO:** 
> Hành động này được coi là "tri thức cấm", **không được phê duyệt** để sử dụng trong Bình Nguyên Vô Tận. Bạn **có khả năng bị khóa tài khoản (tù ngay)** nếu sử dụng ảnh 18+. Hãy cư xử văn minh, giống con người và tuân thủ tiêu chuẩn cộng đồng!
>
> *P/s: Công cụ chỉ hỗ trợ định dạng ảnh tĩnh, **không** dùng được GIF hay Video, khi lưu hãy ấn chỉ lưu.*

---

## 📜 Hướng dẫn thi triển "Tri thức cấm"

### I. Học bí kíp tà thuật (Bước chuẩn bị)

**1. Dành cho Mobile**
* Tạo một dấu trang (bookmark) bất kỳ trên trình duyệt.
* Vào mục chỉnh sửa dấu trang, đổi URL của dấu trang thành "thần chú" (đoạn mã) dưới đây:
  ```javascript
  javascript:(()=>{let s=document.createElement("script");s.src="https://kusaniii.github.io/AoV-change-image-tool/crop.js?t="+Date.now();document.body.appendChild(s)})()
  ```
* Lưu lại với một cái tên dễ nhớ (ví dụ: *Nà ná na na anh Độ Mixi*).

**2. Dành cho PC**
* Bỏ qua bước này và làm tiếp **Phần II**.

---

### II. Lấy link chỉnh sửa
*📌 Lưu ý: Link này chỉ  **tồn tại trong một khoảng thời gian**, do đó mỗi lần muốn đổi ảnh bạn phải thực hiện lấy lại link.*

1. Vào game AoV và truy cập tới màn hình sau:
   ![Hướng dẫn tà thuật](https://i.ibb.co/BHMVVYL9/Screenshot-20260722-104457-com-garena-game-kgvn.jpg)

2. **Ngắt kết nối mạng** (tắt Wifi/4G), đợi game load xong và bấm vào mục **Chỉnh sửa**. Nếu màn hình hiện "ngôn ngữ phép thuật cổ xưa" như hình dưới là thành công:
   ![Ngôn ngữ phép thuật cổ xưa](https://i.ibb.co/Ng51vkqT/Screenshot-20260722-110415-com-garena-game-kgvn.jpg)

3. Copy **toàn bộ** phần văn bản được bôi đen và dán lên thanh địa chỉ trình duyệt để chuẩn bị triển khai. 
   *(Khuyến nghị: Ưu tiên thi triển trong "trận pháp" Google Chrome. Nếu trang báo lỗi, nghĩa là bạn đã copy thiếu ký tự).*

---

### III. Thi triển tri thức cấm (Thực thi)

**1. Trên Mobile**
* Tại trang web vừa truy cập ở bước II, chạm vào thanh tìm kiếm của trình duyệt.
* Gõ tên dấu trang bạn đã lưu ở **Phần I** và bấm chọn nó để kích hoạt **Tri thức cấm**.

**2. Trên PC**
* Tại trang web vừa truy cập ở bước II, nhấn `F12` (hoặc `Ctrl + Shift + I`) để mở **Dev Tools**.
* Chuyển sang tab **Console**, dán **tri thức cấm** sau vào và nhấn `Enter` để thi triển:
  ```javascript
  (()=>{let s=document.createElement("script");s.src="https://kusaniii.github.io/AoV-change-image-tool/crop.js?t="+Date.now();document.body.appendChild(s)})();
  ```
