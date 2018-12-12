/**
 * Created by lingxi on 2017/12/25.
 */
const env = process.env.NODE_ENV == 'production';
console.log(process.env.NODE_ENV)
module.exports = {
    port: '4000',
    system_id: 68888888888888,
    user_server_host: '10.0.2.4',
    user_server_port: 8082,
    openUrl: ['/ORDER/PUSHORDER', '/SUBJECT/PUSHSUBJECT']
}