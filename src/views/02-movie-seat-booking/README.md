## Original README

### Movie Seat Booking

Display movie choices and seats in a theater to select from in order to purchase tickets

### Project Specifications

- Display UI with movie select, screen, seats, legend & seat info
- User can select a movie/price
- User can select/deselect seats
- User can not select occupied seats
- Number of seats and price will update
- Save seats, movie and price to local storage so that UI is still populated on refresh

Design inspiration from [Dribbble](https://dribbble.com/shots/3628370-Movie-Seat-Booking)

----

## 我的记录(My Logs)

### 修改
- 选座信息由直接存储已选座位的序号改为了将座位状态存储在数组中，便于理解的同时减少了数组遍历的操作次数