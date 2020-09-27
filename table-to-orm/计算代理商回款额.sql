SELECT sum(returnAmount) FROM (
  SELECT * FROM `qb_usercommission` AS u
  where u.status = 1 and date(u.createTime) >= '2020-07-01 00:00:00' and date(u.createTime) <= '2020-07-31 23:59:59' ) as u
  LEFT OUTER JOIN `ch_sales_order_profit_details` AS `c` ON u.`orderNo` = `c`.`relevanceNo`
WHERE c.channelId = 'f0e5d4f440a94868b570083aa6ab4165'