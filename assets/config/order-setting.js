/**
 * Created by lingxi on 2017/12/29.
 */
module.exports = {
    pushOrder: {
        params: ['batchId', 'orderNo', 'supplierId', 'supplierCompanyName', 'tradingCompanyId', 'tradingCompanyName', 'orderCreateTime', 'orderType', 'receivable', 'orderStatus', 'transStatus', 'deliveryType', 'isLoan', 'loanType', 'signType', 'sign'],
        Md5Key: ''
    },
    pushSubject:{
        params: ['orderId','creditor','debtor','amout','air','startDate','expiryDate','use','guaranteeWay','guarantor','guarantorId','signType','sign']
    }
}