/**
 * Created by lingxi on 2018/2/2.
 */
const hcb_com_car = require('./../../modules').hcb_com_car;
module.exports = {
    add: (param = {}) => {
        /**
         * 货车帮-车辆信息 hcb_com_car
         * 不能为空字段
         * company_id 客户号码
         * org_code 统一社会信用代码
         * 可以为空
         * car_brand 牵引车品牌  进口 合资 国产
         * has_storage 有无仓储分拨中心  0 无  1 有
         * has_park 有无固定停车场 0 无 1 有
         * total_car_quantity  总车辆数量 公司实际可用货运车辆总数
         * own_car_quantity  自有车辆数量 自有货运车辆
         * other_car_quantity 挂靠车辆数量
         * loan_car_quantity 有贷款的车辆数量 自有货运车辆中，目前有贷款的数量
         * avg_m_etc_amt 月均通行费用（全部车辆）(万元)
         * avg_m_oil_amt 月均加油费用（全部车辆）(万元)
         * main_ops 是否核心承运商 0 是 1 否
         */
        let {
            company_id, org_code, car_brand, has_storage, has_park, total_car_quantity, loan_car_quantity, avg_m_etc_amt,
            avg_m_oil_amt, main_ops
        } = param;
        let hcb_com_car = {
            company_id,
            org_code,
            car_brand,
            has_storage,
            has_park,
            total_car_quantity,
            loan_car_quantity,
            avg_m_etc_amt,
            avg_m_oil_amt,
            main_ops
        };
        return hcb_com_car.create(hcb_com_car);
    }
};