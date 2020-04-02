// import dayjs from 'dayjs'
let messages = (context, type, mes) => {
  context.$message({
    type: type,
    message: mes
  });
}

module.exports = {
  messages,
}
