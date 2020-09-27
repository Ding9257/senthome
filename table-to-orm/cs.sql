-- 承接关系变更为新下发公司
update cs_project_accept set companyId = '30933bc61b974a8abbb7ad3bfe0dc233',companyName = '东润金石（山东）文化信息咨询有限公司' where projectId in (
select flowNo from cs_project where customKey = '25d55d0387284e3ab7694493b36c3249'
) and companyId = 'rizhao' and companyId != '30933bc61b974a8abbb7ad3bfe0dc233' and status = 1;

-- 转分包变更为新下发公司
update cs_project_zfb set companyId = '30933bc61b974a8abbb7ad3bfe0dc233',companyName = '东润金石（山东）文化信息咨询有限公司' where  customkey = '25d55d0387284e3ab7694493b36c3249' and companyId = 'rizhao' and companyId != '30933bc61b974a8abbb7ad3bfe0dc233' and status = 1;

-- 添加项目成员
INSERT INTO cs_project_member(flowNo,projectId,projectName,zfbId,isZFB,userId,userName,certId,phoneNo,office,joinType,invoiceContent,isRealName,isSign,signUrl,memberStatus,
customKey,customName,companyId,companyName,resume,memberTaskId,memberApplyType,price,cycleType,cycleTime,locationId)
select md5(UUID()) as flowNo,projectId,projectName,zfbId,isZFB,userId,userName,certId,phoneNo,office,joinType,invoiceContent,isRealName,isSign,signUrl,memberStatus,
customKey,customName,
'30933bc61b974a8abbb7ad3bfe0dc233' as companyId,'东润金石（山东）文化信息咨询有限公司' as companyName,
resume,memberTaskId,memberApplyType,price,cycleType,cycleTime,locationId
from cs_project_member where customkey = '25d55d0387284e3ab7694493b36c3249' and companyId = 'rizhao' and companyId != '30933bc61b974a8abbb7ad3bfe0dc233' and isSign = 1 and status = 1;

-- 原下发公司成员失效
update cs_project_member set status = 0 where customkey = '25d55d0387284e3ab7694493b36c3249' and companyId = 'rizhao' and companyId != '30933bc61b974a8abbb7ad3bfe0dc233' and isSign = 1 and status = 1;

-- 添加个人任务
INSERT INTO cs_member_task(flowNo,projectId,projectName,userId,userName,certId,zfbId,isZfb,signUrl,isSign,taskStatus,taskTime,applyStatus,taskPrice,office,applyType,cycleType,
cycleTime,customKey,customName,locationId,companyId,companyName)
SELECT md5(UUID()) as flowNo,projectId,projectName,userId,userName,certId,zfbId,isZfb,signUrl,isSign,taskStatus,taskTime,applyStatus,taskPrice,office,applyType,cycleType,
cycleTime,customKey,customName,locationId,
'30933bc61b974a8abbb7ad3bfe0dc233' as companyId,'东润金石（山东）文化信息咨询有限公司' as companyName
from cs_member_task where  customkey = '25d55d0387284e3ab7694493b36c3249' and companyId = 'rizhao' and companyId != '30933bc61b974a8abbb7ad3bfe0dc233' and isSign = 1 and status = 1;

-- 原公司个人任务作废
update cs_member_task set status = 0 where customkey = '25d55d0387284e3ab7694493b36c3249' and companyId = 'rizhao' and companyId != '30933bc61b974a8abbb7ad3bfe0dc233' and isSign = 1 and status = 1;

-- 关联项目成员与个人任务
update cs_project_member,cs_member_task set cs_project_member.memberTaskId = cs_member_task.flowNo
where cs_project_member.certId = cs_member_task.certId and cs_project_member.projectId = cs_member_task.projectId and cs_project_member.customKey = cs_member_task.customKey
and cs_project_member.companyId = cs_member_task.companyId and cs_project_member.isSign = 1;



商户 041a4c132c414bf8b1f3cc0f79fa112f  to   25d55d0387284e3ab7694493b36c3249
原    f1791a0bd67348f8bfb8234a51fa46a3  to   rizhao
新    3af3df08e040461b81105d60789b6337   to   30933bc61b974a8abbb7ad3bfe0dc233
东润金石（山东）文化信息咨询有限公司    to      东润金石（山东）文化信息咨询有限公司