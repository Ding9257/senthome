/**
 * Created by lingxi on 2018/2/2.
 */
const hcb_additional = require('./../../modules').hcb_additional;
module.exports = {
    add: (param = {}) => {
        /**
         * 货车帮-附加信息 hcb_additional
         * 不能为空字段
         * company_id
         * 可以为空
         * work_years 运输行业连续经营年限
         * worker_num 在职员工人数（不含挂靠）
         * driver_num 全职司机人数（不含挂靠）
         * drive_avg_years 货运司机平均驾龄（年）
         * co_years 货车帮合作起始时间 精确到日
         */
        let {company_id, work_years, worker_num, driver_num, drive_avg_years, co_years} = param;
        let data = {
            company_id, work_years, worker_num, driver_num, drive_avg_years, co_years
        };
        return hcb_additional.create(hcb_additional);
    }
}