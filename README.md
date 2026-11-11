# B25DCCC198-BaiTH03
A. useState – Quản lý trạng thái cục bộ (Local State)

1. Dữ liệu được quản lý

Form đăng nhập (LoginPage.tsx):

username: Lưu tên đăng nhập người dùng nhập.

password: Lưu mật khẩu người dùng nhập.

Đây là dữ liệu tạm thời trong quá trình người dùng điền biểu mẫu.

Từ khóa tìm kiếm (HomePage.tsx):

searchTerm: Lưu từ khóa tìm kiếm sản phẩm.

Sử dụng để lọc danh sách sản phẩm theo tên ngay trên giao diện.

Chi tiết sản phẩm (ProductDetailPage.tsx):

product: Lưu thông tin chi tiết của sản phẩm được truy xuất theo ID.

loading: Theo dõi trạng thái tải dữ liệu từ API.

Trạng thái đặt hàng (CheckoutPage.tsx):

isDone: Xác định việc đặt hàng đã hoàn tất hay chưa.

Được sử dụng để hiển thị thông báo xác nhận sau khi người dùng đặt hàng thành công.

2. Lý do sử dụng useState

Phạm vi sử dụng nhỏ: Các trạng thái chỉ phục vụ một component hoặc một trang cụ thể, không cần chia sẻ với những khu vực khác trong ứng dụng.

Dễ triển khai và quản lý: useState có cú pháp đơn giản, dễ sử dụng và phù hợp với những dữ liệu có vòng đời gắn liền với component.

Tránh phức tạp hóa hệ thống: Không cần đưa những dữ liệu cục bộ vào Context API hoặc Redux Toolkit, giúp giảm lượng code và hạn chế việc quản lý state không cần thiết.

B. Context API – Quản lý trạng thái giao diện và xác thực toàn cục (Global UI & Auth State)

1. Dữ liệu được quản lý

Theme ứng dụng (ThemeContext.tsx):

theme: Lưu chế độ giao diện hiện tại ('light' | 'dark').

toggleTheme(): Hàm chuyển đổi giữa chế độ sáng và tối.

Cho phép các component sử dụng chung một giao diện thống nhất.

Xác thực người dùng (AuthContext.tsx):

user: Lưu thông tin người dùng hiện đang đăng nhập (User | null).

login(): Xử lý trạng thái đăng nhập.

logout(): Xử lý trạng thái đăng xuất.

Hỗ trợ kiểm tra trạng thái xác thực và quản lý quyền truy cập các trang.

2. Lý do sử dụng Context API

Chia sẻ dữ liệu trên toàn ứng dụng: Theme và thông tin người dùng cần được truy cập từ nhiều component khác nhau mà không phải truyền props qua nhiều cấp.

Phù hợp với dữ liệu ít thay đổi: Theme và thông tin xác thực thường không thay đổi liên tục, do đó Context API đáp ứng tốt nhu cầu quản lý.

Giảm thiểu mã nguồn: Không cần thiết lập Redux Store và các Slice riêng cho những trạng thái toàn cục có cấu trúc đơn giản.

Dễ bảo trì: Tách biệt logic xác thực và giao diện thành các Context riêng, giúp mã nguồn rõ ràng và dễ mở rộng.

C. Redux Toolkit – Quản lý trạng thái dữ liệu nghiệp vụ (Global Data & Business Logic State)

1. Dữ liệu được quản lý

Danh sách sản phẩm (productsSlice.ts):

items: Product[]: Lưu danh sách sản phẩm lấy từ API.

status: Theo dõi trạng thái xử lý dữ liệu ('idle' | 'loading' | 'succeeded' | 'failed').

error: Lưu thông tin lỗi nếu quá trình lấy dữ liệu thất bại.

Sử dụng createAsyncThunk để xử lý các thao tác gọi API bất đồng bộ.

Giỏ hàng (cartSlice.ts):

items: CartItem[]: Lưu danh sách sản phẩm hiện có trong giỏ hàng.

Các actions xử lý giỏ hàng:

addToCart: Thêm sản phẩm vào giỏ hàng.

removeFromCart: Xóa sản phẩm khỏi giỏ hàng.

updateQuantity: Cập nhật số lượng sản phẩm.

clearCart: Xóa toàn bộ sản phẩm trong giỏ hàng.

Các selectors hỗ trợ tính toán dữ liệu:

selectTotalQuantity: Tính tổng số lượng sản phẩm trong giỏ hàng.

selectTotalPrice: Tính tổng giá trị đơn hàng.

2. Lý do sử dụng Redux Toolkit

Chia sẻ trạng thái giữa nhiều component: Danh sách sản phẩm và giỏ hàng được sử dụng ở nhiều khu vực khác nhau:

Trang chủ: Hiển thị sản phẩm và thêm sản phẩm vào giỏ hàng.

Trang chi tiết: Hiển thị thông tin và thêm sản phẩm vào giỏ hàng.

Header: Hiển thị số lượng sản phẩm hiện có trong giỏ hàng.

Trang giỏ hàng: Cập nhật số lượng và xóa sản phẩm.

Trang thanh toán: Truy xuất thông tin đơn hàng và cập nhật giỏ hàng sau khi đặt hàng thành công.

Quản lý dữ liệu bất đồng bộ hiệu quả: Redux Toolkit cung cấp createAsyncThunk để xử lý các tác vụ gọi API. Các trạng thái pending, fulfilled và rejected giúp theo dõi quá trình tải dữ liệu, nhận kết quả và xử lý lỗi một cách rõ ràng.

Tổ chức logic nghiệp vụ tập trung: Các thao tác liên quan đến sản phẩm và giỏ hàng được quản lý trong các Slice riêng biệt, giúp hạn chế việc phân tán logic xử lý ở nhiều component.

Tối ưu việc truy xuất dữ liệu với Selectors: Các selectors giúp tập trung logic tính toán dữ liệu dẫn xuất như tổng số lượng và tổng tiền, tránh lặp lại cùng một logic ở nhiều nơi trong ứng dụng.
